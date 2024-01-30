import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const MainPage = () => {
    const [quizData, setQuizData] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    const [filteredArray, setFilteredArray] = useState([])

    const fetchData = async () => {
    try {
      const resp = await fetch('http://localhost:4400/quiz')
      const data = await resp.json()
      const filteredData = data.filter(quiz => quiz.active === true);
      setFilteredArray(filteredData)
      setQuizData(filteredData)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
    
    const handleClick = (id) => {
        navigate(`/quizpage/${id}`)
    }

    const useFilter = (e) => {
        console.log(quizData.name)
        if(quizData) {
            const filter = quizData.filter(obj => obj.name.toLowerCase().includes(e.target.value.toLowerCase()))
            setFilteredArray(filter)}
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
        <label>
            Find quiz <br/>
            <input onChange={(e) => useFilter(e)}/>
        </label>
        <div className="cardsContainer">
            {filteredArray && filteredArray.map((quiz) => (
                <div onClick={() =>handleClick(quiz.id)} className="card" key={quiz.id}>
                    <img src={quiz.img} alt="planet" />
                    <h2>{quiz.name}</h2>
                    <p>My Top Score: 0 out of {quiz.questions && quiz.questions.length}</p>
            </div>
            ) )}
        </div>
            </>
    )
}

    export default MainPage