import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../App"
import RenderOptions from "../components/EditQuiz/RenderOptions"
import { PatchQuiz } from "../components/EditQuiz/PatchQuiz"

const QuizEditPage = () => {
    const { quizid } = useParams()
    const { userName } = useContext(AppContext)
    const [currentTab, setCurrentTab] = useState(1)
    const [totalOptions, setTotalOptions] = useState(1)
    
    const [quizData, setQuizData] = useState({})
    const [question, setQuestion] = useState('')
    const [optionsArr, setOptionsArr] = useState([])
    const [answer, setAnswer] = useState('')
    const navigate = useNavigate()

    // Atsisiunčiam klausimyno duomenis ir išsaugome quizData
    const fetchData = async () => {
        try {
        const resp = await fetch('http://localhost:4400/quiz/' + quizid)
        const data = await resp.json()
        setQuizData(data)
        } catch (err) {
            console.err(err);
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])
    
    // Jei atsiųstas quizData turi klausimus juos perduodam į formos inputus, taip pat naviguojant tarp puslapių atnaujiname inputus
    
    useEffect(() => {
        if(quizData.questions && quizData.questions.length >= currentTab) {
            if(quizData.questions[currentTab - 1].options.length > 0) {
            setTotalOptions(quizData.questions[currentTab - 1].options.length)}
            setQuestion(quizData.questions[currentTab - 1].question)
            setAnswer(quizData.questions[currentTab - 1].answer)
            setOptionsArr(quizData.questions[currentTab - 1].options)}
        else {
            setQuestion('')
            setAnswer('')
            setOptionsArr([])
        }
    }, [quizData.questions, currentTab])

    // Navigavija tarp klausimų, naudoju .then nes kartais veikia, o kartais ne. (man atrodo) tab'ai keičiasi greičiau, nei data atsinaujina...?
    const nextQuestion = () => {
        updateQuizData()
        if(quizData.questions[currentTab - 1].options.length === 0 ) {return alert('Add atlest 1 incorrect answer')}
        setTotalOptions(1)
        setCurrentTab((prevValue) => prevValue + 1)
        console.log(currentTab)
    }
    
    const prevQuestion = () => {
        updateQuizData()
        
        currentTab > 1 ?
        setCurrentTab((prevValue) => prevValue - 1) :
        navigate('/userPage/' + userName.name)
    }
    // ========================

    const updateQuizData = () => {
        const updatedQuiz = {...quizData}
        updatedQuiz.questions[currentTab - 1] = {
            id : currentTab,
            question: question,
            options: [...optionsArr],
            answer: answer
        }
        setQuizData(updatedQuiz)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        updateQuizData()
        if(quizData.questions[currentTab - 1].options.length === 0 ) {return alert('Add atlest 1 incorrect answer')}
        PatchQuiz(quizData, quizid)
    }

    const handleRemoveQuestion = (tab) => {
        const quizDataCopy = { ...quizData }
        const questionsCopy = [...quizData.questions]

        questionsCopy.splice(tab, 1)

        quizDataCopy.questions = questionsCopy

        setQuizData(quizDataCopy)

    }

  return (
    <form className="newQuizForm" onSubmit={handleSubmit}>
        <>
        <h1>{quizData.name}</h1>
        <h2>Add your question #{currentTab}</h2>
        <label>
            Enter your question:<br />
            <input onChange={(e) => setQuestion(e.target.value)} value={question} type="text" placeholder="Ex. what is most common cat fur pattern?" required />
        </label>
        <label>
            Correct answer:<br />
            <input onChange={(e) => setAnswer(e.target.value)} value={answer} type="text" placeholder="Tabby" required />
        </label>
        {<RenderOptions 
        totalOptions={totalOptions}
        optionsArr={optionsArr}
        setOptionsArr={setOptionsArr}
        setTotalOptions={setTotalOptions}
        />}
        <div className="buttonsContainer">
            <button type="button" onClick={() => setTotalOptions((prevValue) => (prevValue + 1))} >Add another incorrect option</button>
            <button type="button" onClick={nextQuestion} >Go to next question</button>
            <button type="button" onClick={prevQuestion}>Previous tab</button>
            <button type="button" onClick={() => handleRemoveQuestion(currentTab - 1)}>I want to remove current question</button>
            <button type='submit'>Save changes</button>
        </div>
        </>
    </form>
  )
}

export default QuizEditPage