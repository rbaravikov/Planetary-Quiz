import { Outlet } from "react-router-dom"
import { TbHeartQuestion } from "react-icons/tb"

const header = () => {
  return (
    <>
    <header>
      <TbHeartQuestion />
    </header>
    <Outlet />
    </>
  )
}

export default header