import { useEffect, useState } from 'react'
import img from '../images/planet.jpg'


const MainPage = () => {
    const [quizData, setQuizData] = useState([])

    const fetchData = async () => {
    try {
      const resp = await fetch('http://localhost:4400/quiz');
      const data = await resp.json();
      setQuizData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="cardsContainer">
            {quizData && quizData.map((quiz) => (
                <div className="card" key={quiz.id}>
                <h2>{quiz.name}</h2>
            </div>
            ) )}
            <div className="card">
                <img src={img} alt="planet" />
                <h2>Planetary Quiz</h2>
                <p>solves</p>
            </div>
        </div>
    )
}

    export default MainPage