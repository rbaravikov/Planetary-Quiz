import { Link, Outlet } from "react-router-dom"
import { TbHeartQuestion } from "react-icons/tb"

const header = () => {
  return (
    <>
    <header>
      
      <div><TbHeartQuestion /><h1>Fancy-quiz.me</h1>
      </div>
      <Link to="/signIn/" >Sign In</Link>
    </header>
    <Outlet />
    </>
  )
}

export default header