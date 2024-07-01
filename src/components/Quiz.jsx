import Question from "./Question";
import React from "react";
import {nanoid} from 'nanoid'

export default function Quiz() {
    const [allData, setAllData] = React.useState([])
    const [questions, setQuestions] = React.useState([])
    const [showWarning, setShowWarning] = React.useState(false)
    const [numCorrectAnswers, setNumCorrectAnswers] = React.useState(0)
    const [showResults, setShowResults] = React.useState(false)

    React.useEffect(() => {
        async function getData() {
            const res = await fetch("https://opentdb.com/api.php?amount=5")
            const data = await res.json()
            setAllData(data.results)
            console.log("render")
            setQuestions(data.results.map((questionData) => {
                return {
                    id: nanoid(),
                    question: questionData.question,
                    answers: [...questionData.incorrect_answers, questionData.correct_answer],
                    correct_answer: questionData.correct_answer,
                    selected_answer: ""
                }
            }))
        }

        if (questions.length === 0) {   
            getData()
        }
    }, [questions])

    function updateAnswer(currentQuestion, answer) {
        setQuestions(prevQuestion => prevQuestion.map((question) => {
            return question.question === currentQuestion ? {...question, selected_answer: answer} : question
        }))
    }

    function checkAnswer() {
        const questionsUnanswered = questions.some((question) => question.selected_answer === "")

        setShowWarning(questionsUnanswered)

        if (!questionsUnanswered) {
            questions.forEach((question) => {
                if(question.selected_answer === question.correct_answer) {
                    setNumCorrectAnswers(prevNum => prevNum + 1)
                }
            })
        }

        setShowResults(true)

        console.log(numCorrectAnswers)

        // const result = questions.map((question) =>  {
        //     return question.selected_answer === question.correct_answer
        // })

        // result.map(r => r === true ? setCorrectAnswers(correctAnswers+1) : setCorrectAnswers(correctAnswers))
        // console.log(correctAnswers)
        
        // const correct_answers = (questions.map((question) =>  {
        //     return question.correct_answer
        // }))

        // const selectedAnswers = questions.map((question) =>  {
        //     return question.selected_answer
        // })

        // console.log(result)
        // console.log(correct_answers)
        // console.log(selectedAnswers)
    }

    function playAgain() {
        setAllData([])
        setQuestions([])
        setNumCorrectAnswers(0)
        setShowResults(false)
        setShowWarning(false)
    }
    
    
    const questionElements = questions.map((question) => {
        return <Question key={question.id} question={question.question} answers={question.answers} updateAnswer={updateAnswer} selected_answer={question.selected_answer} showResults={showResults} correct_answer={question.correct_answer}/>
    })

    return (
        <div className="questions--container">
            <div>{questionElements}</div>
            {showResults ? questionElements.length > 0 && <div>
                <p className="result--message">You scored {numCorrectAnswers} / 5</p>
                <button className="check--answer" onClick={playAgain}>Play Again</button>
            </div> : 
            
            questionElements.length > 0 && <div>
            {showWarning && <p className="warning">You didnt answer all the questions</p>}
            <button onClick={checkAnswer} className="check--answer">Check Answers</button>
            </div>}
        </div>
    )
}