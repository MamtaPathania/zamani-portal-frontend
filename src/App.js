
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Charging from './pages/Charging'
import Deactivate from './pages/Deactivate'
import Logout from './pages/Logout'
function App() {
    return (
        <BrowserRouter>
       
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/Charging' element={<Charging/>} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/deactivation' element={<Deactivate/>} />
                    <Route path='/Logout' element={<Logout/>} />
                </Routes>
        
        </BrowserRouter>

        
        
    )
}

export default App
