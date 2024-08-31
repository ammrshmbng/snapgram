import {Routes,Route} from 'react-router-dom'

import './globals.css'
import { Home } from './_root/pages'
import SigninForm from './_auth/forms/SigninForm'

const App = () => {
  return (
    <main className="flex h-screen">
        <Routes>
          {/* public routes */}
          <Route path='/sign-in' element={<SigninForm/>} />
          {/* private routes */}
          <Route index element={<Home/>} />
        </Routes>
    </main>
  )
}

export default App