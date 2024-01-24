import { useEffect, useState } from 'react'
import img from '../images/planet.jpg'
import { useNavigate, useParams } from 'react-router-dom'


const MainPage = () => {
    const [quizData, setQuizData] = useState([])
    const [quizPage, setQuizPAge] = useState(0)
    const { id } = useParams()
    const navigate = useNavigate()

    const fetchData = async () => {
    try {
      const resp = await fetch('http://localhost:4400/quiz')
      const data = await resp.json()
      setQuizData(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
    
    const handleClick = (id) => {
        navigate(`/quizpage/${id}`)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="cardsContainer">
            {quizData && quizData.map((quiz) => (
                <div onClick={() =>handleClick(quiz.id)} className="card" key={quiz.id}>
                    <img src={quiz.img} alt="planet" />
                    <h2>{quiz.name}</h2>
                    <p>My Top Score: 0 out of {quiz.questions && quiz.questions.length}</p>
            </div>
            ) )}
        </div>
    )
}

    export default MainPage