import './App.css'
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
import {CartContext} from "./context/cartContext.jsx";
import {CartReserve} from "./context/cartReserve.jsx";
import ScrollToTop from "./containers/scrrollToTop.jsx";
function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem("products")) || []);
    const [reserved, setReserved] = useState(JSON.parse(localStorage.getItem("reserved")) || []);
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("isDark") === "true";
    });

    useEffect(() => {
        localStorage.setItem("isDark", isDark.toString());
    }, [isDark]);
    useEffect(()=>{
        localStorage.setItem("isDark", isDark.toString());
        localStorage.setItem("products", JSON.stringify(products));
        localStorage.setItem("reserved", JSON.stringify(reserved));
    })
    return (
        <div id={isDark? 'dark' : 'light'} style={{minHeight:'100vh'}}>
            <UserContext.Provider value={{user,setUser}}>
                <ThemeContext.Provider value={{isDark, setIsDark}}>
                    <CartContext.Provider value={{products,setProducts}}>
                        <CartReserve.Provider value={{ reserved, setReserved }}>
                            <BrowserRouter>
                                <ScrollToTop />
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/login" element={user ? user.isWholesaler ? <Navigate to={'/'}/> : <Navigate to={'/admin/dashboard'}/>  : <Login />} />
                                    <Route path="/admin/dashboard" element={user && !user.isWholesaler  ?  <AdminDash /> : <Navigate to={'/login'}/>} />
                                    <Route path="/category/:id" element={<CategoryProducts />} />
                                    <Route path="/product/:id" element={<Product />}></Route>
                                </Routes>
                            </BrowserRouter>
                        </CartReserve.Provider>
                    </CartContext.Provider>
                </ThemeContext.Provider>
            </UserContext.Provider>
        </div>
    )
}

export default App