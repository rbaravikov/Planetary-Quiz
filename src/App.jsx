import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './sass/global.scss'
import './sass/header.scss'
import Header from './comps/Header' 
import MainPage from './pages/MainPage'
import SignIn from './pages/SignIn'

function App() {

  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/signIn/" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
