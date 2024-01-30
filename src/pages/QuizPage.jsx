import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"



const QuizPage = () => {
    const { id } = useParams()
    const [quizTab, setQuizTab] = useState(0)
    const [quiz, setQuiz] = useState()
    const [score, setScore] = useState(0)
    const [options, setOptions] = useState([])

    const fetchData = async () => {
        try {
          const resp = await fetch('http://localhost:4400/quiz/' +id);
          const data = await resp.json();
          setQuiz(data)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    const randomiseOrder = (options) => {
        for (let i = options.length - 1; i > 0; i--) {
          const randomNumber = Math.floor(Math.random() * (i + 1));
          [options[i], options[randomNumber]] = [options[randomNumber], options[i]];
        }
        return options;
      };

    useEffect(() => {
        if(quiz && quizTab!= 0 && quizTab <= quiz.questions.length) {
            const randomOrderArray = randomiseOrder([...quiz.questions[quizTab - 1].options, quiz.questions[quizTab - 1].answer,])
            setOptions(randomOrderArray)
        }
    }, [quizTab])

    const handleClick = () => {
        setQuizTab((prevValue) => prevValue + 1)
    }

    const handleReset = () => {
        setQuizTab(0)
        setScore(0)
    }

    const handleAnswer = (option) => {
        const currentQuestion = quiz.questions[quizTab - 1]
        if (option === currentQuestion.answer) {setScore((prevScore) => prevScore + 1)}
        setQuizTab((prevValue) => prevValue + 1)
    }

    const previousQuestion = () => {
        setQuizTab((prevValue) => prevValue - 1)
    }

    const activeQuestionTab = () => {
        return quizTab===0 ? (
            <div className="startNotification">
                <h1>{quiz && quiz.name}</h1>
                <button onClick={handleClick}>START</button>
            </div>) : quiz && quiz.questions.length >= quizTab ? 
            <div className="questionTab">
                <div className="header">
                    <h1>{quiz.name}</h1>
                    <div>
                    <p>Question no {quizTab}</p>
                    <button className="back" onClick={previousQuestion}>Back</button>
                    </div>
                </div>
                <div className="questionBody">
                    <h1>{quiz && quiz.questions[quizTab - 1].question}</h1>
                    <div className="options">
                        {options && options.map((option, index) => (
                            <button className="option" onClick={() =>handleAnswer(option)} key={index}>{option}</button>
                        ))}
                    </div>
                </div>
            </div> :
            <div className="startNotification">
                {score === quiz.questions.length ?
                <>
                <h1>Good Job, your score is {score} out of {quiz.questions.length}.</h1>
                <h1>{quiz.victoryMsg}</h1>
                </> 
                : 
                <>
                <h1>Nice try, your score is {score} out of {quiz.questions.length}.</h1>
                <h1>{quiz.tryMsg}</h1>
                </>}
                {score === quiz.questions.length ? <Link to={'/mainpage/'}>Try another quiz</Link> : <button onClick={handleReset}>Try Again</button> }
            </div>
            
    }
    
  return (
    <div className="quizContainer">
        {activeQuestionTab()}
        U
    </div>
  )
}

export default QuizPage