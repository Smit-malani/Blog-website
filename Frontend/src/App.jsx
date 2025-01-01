import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserSignup from './Pages/UserSignup'
import Home from './components/Home'
import UserLogin from './Pages/UserLogin'
import CreateBlog from './components/CreateBlog'
import Navbar from './components/Navbar'
import BlogPage from './Pages/BlogPage'

function App() {
 
  return (
    <div className='bg-[#f1f1f1] w-screen h-screen overflow-x-hidden'>
      <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signup' element={<UserSignup/>}></Route>
          <Route path='/login' element={<UserLogin/>}></Route>
          <Route path='/create-blog' element={<CreateBlog/>}></Route>
          <Route path='/blog/:id' element={<BlogPage/>}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
