import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header' 
import Welcome from './pages/WelcomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import MainPage from './pages/MainPage'
import QuizPage from './pages/QuizPage'
import './sass/global.scss'
import { createContext, useEffect, useState } from 'react'
import ErrorPage from './pages/ErrorPage'
import UserPage from './pages/UserPage'
import CreateQuizForm from './pages/CreateQuizForm'
import QuizEditPage from './pages/QuizEditPage'
import './images/questionmark.png'
import FinishQuizEdit from './pages/FinishQuizEdit'
import InitQuizEdit from './pages/InitQuizEdit'
export const AppContext = createContext()

function App() {
  const [userName, setUserName] = useState('')
  const storedUserName = localStorage.getItem('user')
  useEffect(() => {
    if (storedUserName) {
      const parsedUser = JSON.parse(storedUserName);
      setUserName({ name: parsedUser.name, id: parsedUser.id })
    }
  }, [storedUserName]);
  
  return (
    <>
    <AppContext.Provider value={{userName, setUserName}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header setUserName={setUserName} userName={userName} />}>
            <Route path="/" element={<Welcome userName={userName}/>} />
            <Route path="/login/" element={<Login setUserName={setUserName} />} />
            <Route path="/register/" element={<Register setUserName={setUserName}/>} />
            <Route path="/mainpage/" element={<MainPage />} />
            <Route path="/quizpage/:id" element={<QuizPage />} />
            <Route path={"/userpage/:user"} element={<UserPage userName={userName} />} />
            <Route path={"/createquiz"} element={<CreateQuizForm userName={userName} /> } />
            <Route path={"/initquizedit/:quizid"} element={<InitQuizEdit userName={userName} /> } />
            <Route path={"/editquiz/:quizid"} element={<QuizEditPage userName={userName} /> } />
            <Route path={"/editquizfin/:quizid"} element={<FinishQuizEdit userName={userName}/>}/>
            <Route path="/*" element={<ErrorPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
    </>
  )
}

export default App
