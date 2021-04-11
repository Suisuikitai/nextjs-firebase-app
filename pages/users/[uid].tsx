import firebase from 'firebase/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { User } from '../../models/Users'

type Query = {
  uid: string
}
export default function UserShow() {
  const [user, setUser] = useState<User>(null)
  const router = useRouter()
  const query = router.query as Query

  useEffect(() => {
    if (query.uid === undefined) {
      console.log('undefined')
      return
    }
    async function loadUser() {
      const doc = await firebase
        .firestore()
        .collection('users')
        .doc(query.uid)
        .get()

      if (!doc.exists) {
        console.log('not exists!')
        return
      }

      const gotUser = doc.data() as User
      gotUser.uid = doc.id
      setUser(gotUser)
    }
    loadUser()
  }, [query.uid])

  return (
    <div>
      <nav
        className='navbar navbar-expand-lg navbar-light mb-3'
        style={{ backgroundColor: '#e3f2fd' }}
      >
        <div className='container'>
          <div className='mr-auto'>
            <a href='#' className='navbar-brand'>
              Navbar
            </a>
          </div>
          <form className='d-flex'>
            <button className='btn btn-outline-primary' type='submit'>
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className='container'>
        {user && (
          <div className='text-center'>
            <h1 className='h4'>{user.name}さんのページ</h1>
            <div className='m-5'>{user.name}さんに質問しよう！</div>
          </div>
        )}
      </div>
    </div>
  )
}
