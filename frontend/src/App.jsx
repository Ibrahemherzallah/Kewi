import './App.css'
import Hui from './pages/hui'
import Home from './pages/user/home'
import LogIn from "./pages/admin/login.jsx";
import {BrowserRouter, Route, Routes} from "react-router";
import Login from "./pages/admin/login.jsx";
import AdminDash from "./pages/admin/home.jsx";
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<AdminDash />} />
        </Routes>
    </BrowserRouter>
      
  )    
}

export default App
