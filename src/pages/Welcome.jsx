import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className="home">
      <div className="greeting">
        <div className="img"></div>
        <h1>Hey there, welcome to Fancy-quiz.me – where casual meets quizzical!</h1>
        <p>Dive into a world of laid-back quizzes, have some fun, and discover cool facts. Whether you're a trivia newbie or a laid-back quizzer, there's something for everyone. Ready to kick back, relax, and enjoy the Fancy-quiz.me experience?</p>
      <Link to='/register'>SIGN UP & BEGIN!</Link>
      </div>
    </div>
  )
}

export default Welcome