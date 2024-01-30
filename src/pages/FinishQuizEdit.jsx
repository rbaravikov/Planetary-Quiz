import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FetchQuizData from "../components/EditQuiz/FetchQuizData"
import { AppContext } from "../App"
import { PatchQuiz } from "../components/EditQuiz/PatchQuiz"

const FinishQuizEdit = () => {

    const { userName } = useContext(AppContext)
    const { quizid } = useParams()
    const [quizData, setQuizData] = useState({})
    const [victoryMsg, setVictoryMsg] = useState('')
    const [tryMsg, setTryMsg] = useState('')
    const navigate = useNavigate()
    const defaultUrl = '/src/images/questionmark.png'
    const navigateTo = `/userPage/${userName.name}`


    useEffect(() => {
        FetchQuizData(setQuizData, quizid)
    }, [])

    useEffect(() => {
        if(quizData.victoryMsg != 'Congratulations, you got perfect score!') {
            setVictoryMsg(quizData.victoryMsg)
        }
        if(quizData.tryMsg != 'Better luck next time') {
            setTryMsg(quizData.tryMsg)
        }
    }, [quizData])
    
    const updateQuizData = () => {
        const updatedQuiz = ({
            ...quizData,
            victoryMsg : victoryMsg || 'Congratulations, you got perfect score!',
            tryMsg : tryMsg || 'Better luck next time',
            active : true
        })
        setQuizData(updatedQuiz)
        }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateQuizData()
    }

    useEffect(() => {
        if (quizData.active) {
            PatchQuiz(quizData, quizid, navigate, navigateTo)}
    }, [quizData])

  return (
    <form className="quizForm" onSubmit={handleSubmit}>
        <h1>Finaly, lets add message to those that solve Your quiz!</h1>
        <h2>This message will be shown if score is not perfect:</h2>
        <label>
            <input value={tryMsg ?? ''} onChange={(e) => setTryMsg(e.target.value)} type="text" placeholder="ex. Better luck next time"/>
        </label>
        <label>
            <h2>While this message will be shown only to those who get perfect score:</h2>
            <input value={victoryMsg ?? ''} onChange={(e) => setVictoryMsg(e.target.value)} type="text" placeholder="ex. Congratulations, you got a perfect score!"/>
        </label>
        <button>Activate my quiz</button>
    </form>
  )
}

export default FinishQuizEdit