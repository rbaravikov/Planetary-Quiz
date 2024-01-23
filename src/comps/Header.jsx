import { Link, Outlet } from "react-router-dom"
import { TbHeartQuestion } from "react-icons/tb"
import { AppContext } from '../App';
import { useContext } from "react";

const header = () => {
  const { userName } = useContext(AppContext)
  return (
    <>
    <header>
      <Link to="/"><h1><TbHeartQuestion /> Fancy-quiz.me</h1></Link>
      <Link to="/login/" >Log In</Link>
    </header>
    <Outlet />
    </>
  )
}

export default header