import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './comps/Header' 
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import MainPage from './pages/MainPage'
import './sass/global.scss'
import Register from './pages/Register'
import { createContext, useState } from 'react'
export const AppContext = createContext()

function App() {
  const [userName, setUserName] = useState()

  return (
    <>
    <AppContext.Provider value={{userName, setUserName}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/login/" element={<Login setUserName={setUserName} />} />
            <Route path="/register/" element={<Register setUserName={setUserName}/>} />
            <Route path="/mainpage/" element={<MainPage />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
    </>
  )
}

export default App
