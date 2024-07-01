import './App.css'
import React from 'react'
import Start from './components/Start'
import Quiz from './components/Quiz'

function App() {
  const [startQuiz, setStartQuiz] = React.useState(true)

  function startGame() {
    setStartQuiz(false)
  }
  
  return (
    <div>
      {startQuiz ? 
      <Start startGame={startGame}/> : 
      <Quiz/>}    
    </div>
  )
}

export default App
