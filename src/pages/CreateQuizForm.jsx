import { useContext, useState } from "react"
import { AppContext } from "../App"
import { useNavigate } from "react-router-dom"

const NewQuizForm = () => {
  const { userName } = useContext(AppContext)
  const navigate = useNavigate()
  const [newQuiz, setNewQuiz] = useState({
    name: "",
    img: "",
    subject: "",
    questons: [],
    creatorId: userName.id
    }
  ) 

  const handleSubmit = (e) => {
    e.preventDefault()
    postQuiz()

  }

  const postQuiz = async () => {
    try {
      const resp = await fetch('http://localhost:4400/quiz', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuiz),
      })

      const data = await resp.json();

      if (resp.ok) {
        navigate('/userPage/' + userName.name)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const addQuiz = (e) => {
    const { name, value } = e.target;
    setNewQuiz((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      }
    })
  }
  
  return (
    <form className="newQuizForm" onSubmit={handleSubmit}>
        <h1>Lets make our own quiz!</h1>
        <label>
            Quiz name:<br />
            <input name="name" type="text" placeholder="enter name for your quiz here..." onInput={addQuiz} />
        </label>
        <label>
            Topic:<br />
            <input name="subject" type="text" placeholder="What your quiz is about?" onInput={addQuiz} />
        </label>
        <label>
            Image:<br />
            <input name="img" type="url" placeholder="Put img url here" onInput={addQuiz} />
        </label>

        <button>Lets go!</button>
        </form>
  )
}

export default NewQuizForm