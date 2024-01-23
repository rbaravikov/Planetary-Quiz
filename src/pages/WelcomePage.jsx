import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../App';
import { useContext } from "react";

const Welcome = () => {
  const { userName } = useContext(AppContext)
  const navigate = useNavigate()
  useEffect(() => {
    if(userName) {
      navigate('/mainpage/')
    }
  }, [])

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