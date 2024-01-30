import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import { useNavigate } from "react-router-dom"

const NewQuizForm = () => {
  const { userName } = useContext(AppContext)
  const defaultUrl = '/src/images/questionmark.png'
  const navigate = useNavigate()
  const [newQuiz, setNewQuiz] = useState({
    name: "",
    img: defaultUrl,
    subject: "",
    creatorId: "",
    active: false,
    victoryMsg: "",
    tryMsg: "",
    timeLimit: '',
    questions: [
      {
        id: 1,
        question: "",
        options: [
          ""
        ],
        answer: ""
      }
    ]
    }
  ) 

  useEffect(() => {
    setNewQuiz((prevValue) => ({...prevValue, creatorId: userName.id }))
  }, [userName])

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
        navigate(`/initquizedit/${data.id}`)
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

  const ShowButton = () => {
    if (newQuiz.name && newQuiz.subject && newQuiz.img) { return (
      <>
        <h3>
      And thats it your brand new quiz is ready, all thats left is to add questions to it :)
        </h3>
      <button onClick={handleSubmit} >Lets go!</button>
      </>
      )}
  }
  
  return (
    <form className="quizForm">
        <h1>Lets make our own quiz its simle!</h1>
        <label>
            <h4>First we enter quiz name:</h4>
            <input name="name" type="text" placeholder="Enter name for your quiz here..." onInput={addQuiz} required />
        </label>
        <label>
            <h4>Next, lets deside what it is about:</h4>
            <input name="subject" type="text" placeholder="Ex. Popular cat fur patterns" onInput={addQuiz} required />
        </label>
        <div className={newQuiz.name && newQuiz.subject ? "visible" : "hidden"}>
        <h3>
      And thats it your brand new quiz is ready, all thats left is to add questions to it :)
        </h3>
      <button onClick={handleSubmit} >Lets go!</button>
      </div>
        </form>
  )
}

export default NewQuizForm