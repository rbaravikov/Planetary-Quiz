import { useNavigate  } from "react-router-dom"
import { AppContext } from '../App';
import { useContext, useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

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
    navigate(`/initquizedit/${id}`)
  }

  const postDelete = async (quizId) => {
    try {
      const deleteResp = await fetch(`http://localhost:4400/quiz/${quizId}`, {
        method: 'DELETE',
      });
  
      if (deleteResp.ok) {
        console.log('Quiz deleted successfully');
        // You may want to refetch data after deletion
        fetchData();
      } else {
        console.error('Error deleting quiz:', deleteResp.status);
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handleDelete = (quiz) => {
    if (confirm(`Are you sure you want to delete ${quiz.name} quiz?`)) return postDelete(quiz.id)
  }

  return (
    <>
     <div className="cardsContainer">
      {userQuizData && userQuizData.map((quiz) => (
        <div className="card" key={quiz.id}>
          <div onClick={() => openQuiz(quiz.id)} className="card-content">
            <img src={quiz.img} alt="planet" />
            <h2>{quiz.name}</h2>
            <p>My Top Score: 0 out of {quiz.questions && quiz.questions.length}</p>
          </div>
          <div onClick={() => handleDelete(quiz)} className="deleteQuiz">
            <FaTrashCan />
          </div>
        </div>
      ))}
        </div>
    <button onClick={handleClick} >Log Out</button>
    </>
  )
}

export default UserPage