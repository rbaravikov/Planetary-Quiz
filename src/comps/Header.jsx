import { Link, Outlet } from "react-router-dom"
import { TbHeartQuestion } from "react-icons/tb"

const header = () => {
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