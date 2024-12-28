import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserSignup from './Pages/UserSignup'
import Blogs from './components/Blogs'
import UserLogin from './Pages/UserLogin'
import CreateBlog from './components/CreateBlog'

function App() {
 

  return (
    <Routes>
      <Route path='/' element={<Blogs/>}></Route>
      <Route path='/signup' element={<UserSignup/>}></Route>
      <Route path='/login' element={<UserLogin/>}></Route>
      <Route path='/create-blog' element={<CreateBlog/>}></Route>
    </Routes>
  )
}
{/* <UserSignup/> */}

export default App
