import { NextApiRequest, NextApiResponse } from 'next'
import '../../../../lib/firebase_admin'
import { firestore } from 'firebase-admin'
import { Answer } from '../../../../models/Answer'
import { Question } from '../../../../models/Question'
import Layout from '../../../../components/Layout'
import { parseClassName } from 'react-toastify/dist/utils'

type Data = {
  answer: Answer
  question: Question
}

export async function getServerSideProps({ query }) {
  const res = await fetch(process.env.API_URL + `/api/answers/${query.id}`)
  const json = await res.json()
  return { props: json }
}

;async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const id = req.query.id as string

  const answerDoc = await firestore().collection('answers').doc(id).get()
  const answer = answerDoc.data() as Answer
  answer.id = answerDoc.id

  const questionDoc = await firestore()
    .collection('questinos')
    .doc(answer.questionId)
    .get()
  const question = questionDoc.data() as Question
  question.id = questionDoc.id

  res.status(200).json({
    answer,
    question,
  })
}
