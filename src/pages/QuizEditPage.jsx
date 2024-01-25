import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../App"
import RenderOptions from "../components/EditQuiz/RenderOptions"

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
    const [updatedquestions, setUpdatedquestions] = useState()
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

    useEffect(() => {
        if(quizData.options) {
            setQuizVariables(quizData.options)}
    }, [quizData.options])
    
    const addQuestion = () => {
        saveQuestions()
        setCurrentTab((prevValue) => prevValue + 1)
    }
    
    const prevQuestion = () => {
        saveQuestions()
        currentTab > 1 ? setCurrentTab((prevValue) => prevValue - 1) : navigate('/userPage/' + userName.name)
    }
    
    // ==========================================================================
        
    const saveQuestions = () => {
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
    }

    // ==========================================================================
    const patchData = async () => {
        try {
            const resp = await fetch('http://localhost:4400/quiz/' + quizid, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedquestions),
            });
            const data = await resp.json()
            if (resp.ok) {
            console.log(data)
            } else {
            console.error('Failed to update data:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error during PATCH request:', error);
        }
    }

    useEffect(() => {

    }, [updatedquestions])
    
    const updateQuiz = () => {
        saveQuestions()
        const updatedQuiz = {
            ...quizData,
            questions : quizVariables.map(( {id, question, options, answer} ) => ({
            id,
            question,
            options: [...options],
            answer,
        }))
        }
        setUpdatedquestions(updatedQuiz)
    }

    useEffect(() => {
        patchData()
    }, [updatedquestions])
    
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
            <input onChange={(e) => setQuestion(e.target.value)} value={question} type="text" placeholder="Ex. what is most common cat fur pattern?" />
        </label>
        <label>
            Correct answer:<br />
            <input onChange={(e) => setAnswer(e.target.value)} value={answer} type="text" placeholder="Tabby" />
        </label>
        {<RenderOptions 
        totalQuestions={totalQuestions}
        option={option}
        handleOptionChange={handleOptionChange}
        />}
        {<button onClick={() => setTotalQuestions((prevValue) => (prevValue + 1))} >Add another incorrect option</button>}
        <button  onClick={addQuestion} >Lets add next question</button>
        <button onClick={prevQuestion}>Previous tab</button>
        </>
        <button onClick={updateQuiz}>Finish editing</button>
    </form>
  )
}

export default QuizEditPage