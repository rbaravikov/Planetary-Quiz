import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './comps/Header' 
import MainPage from './pages/MainPage'
import Login from './pages/Login'
import './sass/global.scss'
import Register from './pages/Register'

function App() {

  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/register/" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
