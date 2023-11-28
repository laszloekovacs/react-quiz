import { useState } from 'react'

import './App.css'

type Quiz = {
  text: string
  correct: string
  answers: {
    text: string
  }[]
}

const quiz: Quiz[] = [
  {
    text: 'What is the capital of France?',
    correct: 'Paris',
    answers: [
      { text: 'New York City' },
      { text: 'London' },
      { text: 'Paris' },
      { text: 'Dublin' },
    ],
  },
  {
    text: 'Who is CEO of Tesla?',
    correct: 'Elon Musk',
    answers: [
      { text: 'Jeff Bezos' },
      { text: 'Elon Musk' },
      { text: 'Bill Gates' },
      { text: 'Tony Stark' },
    ],
  },
  {
    text: "what's your favorite programming language ?",
    correct: 'TypeScript',
    answers: [
      { text: 'Java' },
      { text: 'C#' },
      { text: 'Python' },
      { text: 'TypeScript' },
    ],
  },
]

const Question = ({
  question,
  onSubmit,
}: {
  question: Quiz
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) => {
  return (
    <div>
      <h2>{question.text}</h2>
      <form onSubmit={onSubmit}>
        <ul>
          {question.answers.map((answer) => (
            <li key={answer.text}>
              <label>
                <input type="radio" name="answer" value={answer.text} />
                {answer.text}
              </label>
            </li>
          ))}
        </ul>

        <input className="btn" type="submit" value="Submit" />
      </form>
    </div>
  )
}

const Score = ({
  score,
  onReset,
}: {
  score: number
  onReset: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <div>
      <h2>Congrats, Your Score is...</h2>
      <br />
      <h1>{score}</h1>
      <p>out of possible {quiz.length}</p>
      <button onClick={onReset}>retry</button>
    </div>
  )
}

function App() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)

  const handleReset = () => {
    setCurrent(0)
    setScore(0)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.target as HTMLFormElement)
    const answer = data.get('answer')

    if (answer === quiz[current].correct) {
      setScore(score + 1)
    }

    // advance questions
    if (current < quiz.length) {
      setCurrent(current + 1)
    }
  }

  return (
    <div>
      <h1>Quiz App</h1>
      <div className="card">
        {current < quiz.length ? (
          <Question question={quiz[current]} onSubmit={handleSubmit} />
        ) : (
          <Score score={score} onReset={handleReset} />
        )}
      </div>
    </div>
  )
}

export default App
