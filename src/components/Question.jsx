import {decode} from 'html-entities'

export default function Question(props) {
    function chooseAnswer(currentQuestion, answer) {
        props.updateAnswer(currentQuestion, answer)
    }

    const answers = props.answers.map((answer, index) => {
        return <button 
        onClick={() => chooseAnswer(props.question, answer)} 
        className={`answer--button
            ${answer === props.selected_answer ? "selected" : ""} 
            ${props.showResults && answer === props.correct_answer ? "correct" : ""} 
            ${props.showResults && answer === props.selected_answer && answer !== props.correct_answer? "incorrect" : ""}
            ${props.showResults && answer !== props.correct_answer ? "dimmed" : ""}`
        }
            disabled={props.showResults}
            key={index}
            >
                {decode(answer)}
            </button>
    })

    return (
        <div className="quiz--container">
            <h2>{decode(props.question)}</h2>
            <div className="answers--container">
                {answers}
            </div>
        </div>
    )
}