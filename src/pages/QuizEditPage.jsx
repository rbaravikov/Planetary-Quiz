import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../App"

const QuizEditPage = () => {
    const { quizid } = useParams()
    const { userName } = useContext(AppContext)
    const [currentTab, setCurrentTab] = useState(1)
    const [totalQuestions, setTotalQuestions] = useState(1)
    const [option, setOption] = useState([])
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [quizData, setQuizData] = useState({})
    const navigate = useNavigate()
    const [quizVariables, setQuizVariables] = useState([{
        id: currentTab,
        question: '',
        options: [],
        answer: ''
    }])
    
    const fetchData = async () => {
        try {
            const resp = await fetch('http://localhost:4400/quiz/' + quizid)
          const data = await resp.json()
          setQuizData(data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])
    
    const handleQuestionInput = (e) => {
        setQuestion(e.target.value)
    }

    const handleAnswerInput = (e) => {
        setAnswer(e.target.value)
    }

    const addQuestion = () => {
        saveQuestion()
    }
    
    const addOption = () => {
        setTotalQuestions((prevValue) => (prevValue + 1))
    }
    
    // ==========================================================================
    
    useEffect(() => {
        console.log(quizVariables)
    }, [quizVariables])
    
    
    const renderOptions = () => {
        const options = []
        
        for (let i = 0; i < totalQuestions; i++) {
            options.push(
            <label key={i}>
                Incorrect answer {i + 1}:<br />
                <input type="text" value={option[i] || ''} placeholder={`Ex. Orange cat`} onChange={(e) => handleOptionChange(i, e.target.value)}
                />
            </label>
            )
        }
        return <>{options}</>;
    }

    const saveQuestion = () => {
        const objectId = quizVariables.findIndex(object => object.id === currentTab);
        const newQuestion = {
            id: currentTab,
            question: question,
            options: [...option],
            answer: answer
        }
    
        if (objectId !== -1) {
            const newArr = quizVariables.map(obj => (obj.id === currentTab ? newQuestion : obj));
            setQuizVariables(newArr);
        } else {
            setQuizVariables(prevArray => [...prevArray, newQuestion]);
        }

        setQuestion('')
        setAnswer('')
        setOption([])
        setTotalQuestions(1)
        setCurrentTab((prevValue) => prevValue + 1)
    }

    // ==========================================================================
    
    const prevQuestion = () => {
        currentTab > 1 ? setCurrentTab((prevValue) => prevValue - 1) : navigate('/userPage/' + userName.name)
    }

    useEffect(() => {
        const currentQuestion = quizVariables[currentTab - 1];
    
        if (currentQuestion) {
            setQuestion(currentQuestion.question || '');
            setAnswer(currentQuestion.answer || '');
            setOption(currentQuestion.options || []);
        }
    }, [quizVariables, currentTab])
    
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    
    
    const handleOptionChange = (i, value) => {
        setOption((prevValue) => {
            const newOption = [...prevValue]
            newOption[i] = value
            return newOption
        })
      }

  return (
    <form className="newQuizForm" onSubmit={handleSubmit}>
        <>
        <h1>{quizData.name}</h1>
        <h2>Add your question #{currentTab}</h2>
        <label>
            Question:<br />
            <input onChange={handleQuestionInput} value={question} type="text" placeholder="Ex. what is most common cat fur pattern?" />
        </label>
        <label>
            Correct answer:<br />
            <input onChange={handleAnswerInput} value={answer} type="text" placeholder="Tabby" />
        </label>
        {renderOptions()}
        {<button onClick={addOption} >Add another incorrect option</button>}
        <button  onClick={addQuestion} >Lets add next question</button>
        <button onClick={prevQuestion}>Previous tab</button>
        </>
    </form>
  )
}

export default QuizEditPage