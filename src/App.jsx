import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './sass/global.scss'
import './sass/header.scss'
import Header from './comps/Header' 
import MainPage from './pages/MainPage'

function App() {

  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
