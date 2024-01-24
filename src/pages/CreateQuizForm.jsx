import { useState } from "react"

const NewQuizForm = () => {
  const [currentTab, setcurrentTab] = useState(0)
  const [totalOptions, setTotalOptions] = useState(1)
  const [newQuiz, setNewQuiz] = useState({
    name: "",
    img: "",
    subject: "",
    questions: [{
      id:"",
      question: "",
      options: [],
      answer: ""
    }]
  })

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const nextTab = () => {
    setcurrentTab((prevValue) => (prevValue += 1))
  }
  const prevTab = () => {
    setcurrentTab((prevValue) => (prevValue -= 1))
  }

  const addInput = () => {
    setTotalOptions((prevValue) => (prevValue + 1))
  }

  const renderOptions = () => {
    const options = []
    for (let i = 0; i < totalOptions; i++) {
      options.push(
        <label key={i}>Incorrect answer {i + 1}:<br />
        <input name={'options'} id={i + 1} type="text" placeholder={'ex. different pattern'} onInput={addOption} />
        </label>
      )
    }
    return options
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

  const addQuestion = (e) => {
    const { name, value } = e.target;

    setNewQuiz((prevValue) => {
      const updatedQuestions = [...prevValue.questions];
      updatedQuestions[currentTab - 1] = {
        ...updatedQuestions[currentTab - 1],
        [name]: value,
        options: []
      };

      return {
        ...prevValue,
        questions: updatedQuestions,
      };
    });
  };

  const addAnswer = (e) => {
    const { name, value } = e.target;

    setNewQuiz((prevValue) => {
      const updatedQuestions = [...prevValue.questions];
      updatedQuestions[currentTab - 1] = {
        ...updatedQuestions[currentTab - 1],
        [name]: value,
      };

      return {
        ...prevValue,
        questions: updatedQuestions,
      };
    });
  };
  
  const addOption = (e) => {
    const { id, value } = e.target;
  
    setNewQuiz((prevValue) => {
      const updatedQuestions = [...prevValue.questions];
      const currentQuestion = updatedQuestions[currentTab - 1];
  
      const updatedOptions = [...currentQuestion.options];
      const optionIndex = id - 1;
  
      if (optionIndex < updatedOptions.length) {
        updatedOptions[optionIndex] = value;
      } else {
        updatedOptions.push(value);
      }
  
      currentQuestion.options = updatedOptions;
      updatedQuestions[currentTab - 1] = currentQuestion;
  
      return {
        ...prevValue,
        questions: updatedQuestions,
      };
    });
  };
  
  
  return (
    <form className="newQuizForm" onSubmit={handleSubmit}>
      {currentTab === 0 && (
        <>
        <h1>Lets make our own quiz!</h1>
        <label>
            Quiz name:<br />
            <input name="name" type="text" placeholder="enter name for your quiz here..." onInput={addQuiz} />
        </label>
        <label>
            Topic:<br />
            <input name="subject" type="text" placeholder="What your quiz is about?" onInput={addQuiz} />
        </label>
        <button onClick={nextTab} >Lets add some questions</button>
        </>
      )}
      {currentTab > 0 && (
        <>
        <h1>Add your question #{currentTab}</h1>
        <label>
            Question:<br />
            <input name="question" type="text" placeholder="Ex. what is most common cat fur pattern?" onInput={addQuestion} />
        </label>
        <label>
            Correct answer:<br />
            <input name="answer" type="text" placeholder="Tabby" onInput={addAnswer} />
        </label>
        {renderOptions()}
        {<button onClick={addInput} >Add anothrer incorrect option</button>}
        <button onClick={nextTab} >Lets add more questions</button>
        <button onClick={prevTab} >Previous tab</button>
        </>
      )}
        </form>
  )
}

export default NewQuizForm