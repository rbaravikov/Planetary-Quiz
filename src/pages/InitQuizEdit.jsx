import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FetchQuizData from "../components/EditQuiz/FetchQuizData"
import { AppContext } from "../App"
import { PatchQuiz } from "../components/EditQuiz/PatchQuiz"

const InitQuizEdit = () => {

    const { userName } = useContext(AppContext)
    const { quizid } = useParams()
    const [quizData, setQuizData] = useState({})
    const [timer, setTimer] = useState('seconds')
    const [timeLimit, setTimeLimit] = useState(60)
    const [imgUrl, setImgUrl] = useState('')
    const [active, setActive] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        FetchQuizData(setQuizData, quizid)
    }, [])
    
    const updateQuizData = () => {
        setQuizData({
            ...quizData,
            timer,
            timeLimit,
            imgUrl,
            active,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const navigateTo = `/editquiz/${quizid}`
        updateQuizData()

        PatchQuiz(quizData, quizid, navigate, navigateTo)
    }

  return (
    <form className="quizForm" onSubmit={handleSubmit}>
        <h1>Set some basic parameters</h1>
        <h2>Paste you url here:</h2>
        <label>
            <input onChange={(e) => setImgUrl(e.target.value)} type="text" placeholder="if blank, default img will be used"/>
        </label>
        <label>
            <h2>Now add timer</h2>
            <select name="timer" id="timer" onChange={() => setTimer(e.target.value)}>
                <option value="seconds">Per question (sec)</option>
                <option value="minutes">Total time (min)</option>
            </select>
            <input onChange={(e) => setTimeLimit(e.target.value)} type="number" min={1} max={60} placeholder="(1-60)"/>
        </label>
        <button>Go to questions</button>
    </form>
  )
}

export default InitQuizEdit