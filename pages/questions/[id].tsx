import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import { useAuthentication } from '../../hooks/authentication'
import { Question } from '../../models/Question'
import Layout from '../../components/Layout'

type Query = {
  id: string
}

export default function QuestionsShow() {
  const router = useRouter()
  const query = router.query as Query
  const { user } = useAuthentication()
  const [question, setQuestion] = useState<Question>(null)

  async function loadData() {
    if (query.id === undefined) {
      return
    }

    const questinoDoc = await firebase
      .firestore()
      .collection('questions')
      .doc(query.id)
      .get()
    if (!questinoDoc.exists) {
      return
    }

    const gotQuestion = questinoDoc.data() as Question
    gotQuestion.id = questinoDoc.id
    setQuestion(gotQuestion)
  }

  useEffect(() => {
    loadData()
  }, [query.id])

  return (
    <Layout>
      <div className='row justify-content-center'>
        <div className='col-12 col-md-6'>
          {question && (
            <div className='card'>
              <div className='card-body'>{question.body}</div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
