import firebase from 'firebase/app'

function authenticate(){
  firebase
  .auth()
  .signInAnonymously()
  .catch(error => {
    let erroCode = error.code
    let erroMessage = error.message
    //
  })

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user.uid)
      console.log(user.isAnonymous)
    }else{
      // User is signed out
    }
  })
}

if (process.browser) {
  authenticate()
}