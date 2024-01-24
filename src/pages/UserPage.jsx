import { Link, useNavigate  } from "react-router-dom"
import { AppContext } from '../App';
import { useContext, useEffect, useState } from "react";

const UserPage = () => {
  const { userName, setUserName } = useContext(AppContext)
  const [userQuizData, setUserQuizData] = useState()
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const resp = await fetch('http://localhost:4400/quiz?creatorId=' + userName.id)
      const data = await resp.json()
      setUserQuizData(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
      fetchData()
  }, [userName])

  
  const handleClick = () => {
    localStorage.setItem('user', '')  
    setUserName('')
    navigate('/')
  }

  const openQuiz = (id) => {
    navigate(`/editquiz/${id}`)
  }

  return (
    <>
     <div className="cardsContainer">
            {userQuizData && userQuizData.map((quiz) => (
                <div onClick={() =>openQuiz(quiz.id)} className="card" key={quiz.id}>
                    <img src={quiz.img} alt="planet" />
                    <h2>{quiz.name}</h2>
                    <p>My Top Score: 0 out of {quiz.questions && quiz.questions.length}</p>
            </div>
            ) )}
        </div>
    <Link to={'/createquiz'} >Create Your Own Quiz</Link>
    <button onClick={handleClick} >Log Out</button>
    </>
  )
}

export default UserPage