import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'


const MainPage = () => {
    const [quizData, setQuizData] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    const [filteredArray, setFilteredArray] = useState([])
    const div = {
        hidden: { opacity: 0},
        visible: {
            opacity: 1,
            transition: {
               delayChildren: 0.3,
                staggerChildren: 0.3
            }
        }
    }

    const card = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        },
        exit: {
            y: 20,
            opacity: 0,
            transition: { duration: 0.5 }
        }
    }

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
        <label className='filter'>
            <h2>Find quiz</h2>
            <input placeholder='Search quiz by name' onChange={(e) => useFilter(e)}/>
        </label>
        <motion.div className='cardsContainer' variants={div} initial="hidden" animate="visible">
            {filteredArray && filteredArray.map((quiz) => (
                <motion.div variants={card} initial='hidden' animate='visible' exit='exit' onClick={() =>handleClick(quiz.id)} className="card" key={quiz.id}>
                    <img src={quiz.img} alt="quiz" onError={(e) => {
                e.target.src = "/src/images/questionmark.png"
            }}/>
                    <h2>{quiz.name}</h2>
                    <h4>{quiz.subject}</h4>
                    <p>My Top Score: 0 out of {quiz.questions && quiz.questions.length}</p>
                </motion.div>
            ) )}
        </motion.div>
            </>
    )
}

    export default MainPage