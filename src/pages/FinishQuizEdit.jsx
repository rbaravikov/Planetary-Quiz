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
    const [tryMsg, settryMsg] = useState('')
    const [active, setActive] = useState(false)
    const navigate = useNavigate()
    const defaultUrl = '/src/images/questionmark.png'


    useEffect(() => {
        FetchQuizData(setQuizData, quizid)
        setVictoryMsg(quizData.victoryMsg)
        settryMsg(quizData.tryMsg)
    }, [])
    
    const updateQuizData = () => {
        const updatedQuiz = ({...quizData,
            victoryMsg : victoryMsg || 'Congratulations, you got perfect score!',
            tryMsg : tryMsg || 'Better luck next time',
            active : active
        })
        setQuizData(updatedQuiz)
        }

    const handleSubmit = (e) => {
        e.preventDefault()
        setActive(true)
        updateQuizData()
        
        const navigateTo = `/userPage/${userName.name}`
        PatchQuiz(quizData, quizid, navigate, navigateTo)
    }

  return (
    <form className="quizForm" onSubmit={handleSubmit}>
        <h1>Finaly, lets add message to those that solve Your quiz!</h1>
        <h2>This message will be shown if score is not perfect:</h2>
        <label>
            <input onChange={(e) => settryMsg(e.target.value)} type="text" placeholder="ex. Better luck next time"/>
        </label>
        <label>
            <h2>While this message will be shown if score perfect:</h2>
            <input onChange={(e) => setVictoryMsg(e.target.value)} type="text" placeholder="ex. Congratulations, you got perfect score!"/>
        </label>
        <button>Activate my quiz</button>
    </form>
  )
}

export default FinishQuizEdit