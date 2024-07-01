export default function Start(props) {
    return (
        <div className="start--page">
            <h1>Quizzical</h1>
            <p>Welcome to our Trivia</p>
            <button onClick={props.startGame}>Start         Quiz</button>
        </div>
    )
}