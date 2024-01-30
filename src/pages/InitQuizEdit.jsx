import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FetchQuizData from "../components/EditQuiz/FetchQuizData"
import { PatchQuiz } from "../components/EditQuiz/PatchQuiz"

const InitQuizEdit = () => {

    const { quizid } = useParams()
    const [timeLimit, setTimeLimit] = useState('')
    const [quizData, setQuizData] = useState({})
    const [imgUrl, setImgUrl] = useState('')
    const [newQuizData, setNewQuizData] = useState({})
    const [execPatch, setExecPatch] = useState(false)
    const active = false
    const navigate = useNavigate()
    const navigateTo = `/editquiz/${quizid}`

    useEffect(() => {
        FetchQuizData(setQuizData, quizid)
    }, [quizid])

    useEffect(() => {
        if(quizData.img && quizData.timeLimit) {
            if (quizData.img !== '/src/images/questionmark.png') {
                setImgUrl(quizData.img || '')
            }
            setTimeLimit(Number(quizData.timeLimit))
        }
    }, [quizData]);
    
    useEffect(() => {
        if (execPatch) {
        PatchQuiz(newQuizData, quizid, navigate, navigateTo)
        }
    }, [newQuizData])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        updateQuizData(navigateTo)
    }

    const updateQuizData = () => {
        if(!isUrl(imgUrl)) {return alert(`Invalid URL\n(its ok to leave it empty :)`)}
        setNewQuizData({
            timeLimit: timeLimit? Number(timeLimit) : 60,
            active: active,
            img: imgUrl || '/src/images/questionmark.png',
        })
        // Neejo update'int duomenu, pasirodo reikia palaukti kol duomenys atsinaujins... ratais-kvadratais sprendimas šitas const :( 
        setExecPatch(true)
    }

    const isUrl = (url) => {
        const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
        if(url.length === 0) {return true}
        return urlPattern.test(url)
    };


  return (
    <form className="quizForm" onSubmit={handleSubmit}>
        <h1>Set some basic parameters</h1>
        <label>
            <h4>
                You can paste URL to your picture here, or leave it blank, for default image
            </h4>
            <input onChange={(e) => setImgUrl(e.target.value)} value={imgUrl} type="text" placeholder="if blank, default img will be used"/>
        </label>
        <label >
            <h4>
                Next, lets decide how many seconds you want to give for each question
            </h4>
            <input value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} type="number" min={1} max={3600} placeholder="(By default it is 60 seconds)"/>
        </label>
        <button>Go to questions</button>
    </form>
  )
}

export default InitQuizEdit