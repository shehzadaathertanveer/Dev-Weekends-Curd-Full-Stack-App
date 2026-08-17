import { useState } from 'react'
import {Route,BrowserRouter,Routes} from "react-router-dom"
import Home from './components/Home'
import CreateUser from './components/CreateUser'
import UpdateUser from './components/UpdateUser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=' h-screen w-full bg-zinc-900 '>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Create' element={<CreateUser/>}></Route>
        <Route path='/Update/:id' element={<UpdateUser/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
