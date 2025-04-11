import './App.css'
import Hui from './pages/hui'
import Home from './pages/user/home'
import LogIn from "./pages/admin/login.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import Login from "./pages/admin/login.jsx";
import AdminDash from "./pages/admin/home.jsx";
import {UserContext} from "./context/userContext.jsx";
import {useEffect, useState} from "react";
import {ThemeContext} from "./context/themeContext.jsx";
import CategoryProducts from "./pages/user/categoryProducts.jsx";
import Product from "./pages/user/product.jsx";
function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("isDark") === "true";
    });

    useEffect(() => {
        localStorage.setItem("isDark", isDark.toString());
    }, [isDark]);

  return (
    <div id={isDark? 'dark' : 'light'} style={{minHeight:'100vh'}}>
        <UserContext.Provider value={{user,setUser}}>
            <ThemeContext.Provider value={{isDark, setIsDark}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={user ? user.isWholesaler ? <Navigate to={'/'}/> : <Navigate to={'/admin/dashboard'}/>  : <Login />} />
                        <Route path="/admin/dashboard" element={user && !user.isWholesaler  ?  <AdminDash /> : <Navigate to={'/login'}/>} />
                        <Route path="/category/:id" element={<CategoryProducts />} />
                        <Route path="/product" element={<Product />}></Route>
                    </Routes>
                </BrowserRouter>
            </ThemeContext.Provider>
        </UserContext.Provider>
    </div>
  )    
}

export default App
