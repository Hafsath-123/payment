import React, { useState } from 'react'
import { CartProvider } from './context/CartContext'
import Cart from './components/Cart'
import ProductList from './components/ProductList'
import { Routes, Route } from 'react-router-dom'
import AdminAddProduct from './components/AdminAddProduct'
import AdminLogin from './components/AdminLogin'
import Success from './components/Success'
import Navbar from './components/Home'
import './App.css'



const App = () => {

    const [isAdmin, setIsAdmin] = useState(false);
    return (
        <CartProvider>
                <div>
                    <Navbar/>
                    <h1>MERN Shop</h1>
                    <Routes>
                        {/* USER SIDE */}
                        <Route path="/"
                            element={
                                <>
                                    <ProductList />
                                    
                                </>
                            }
                        />
                        <Route path="/Cart" element={<Cart/>}/>

                        <Route path="/success" element={<Success />} />
                        {/* ADMIN SIDE */}
                        <Route
                            path="/admin"
                            element={<AdminAddProduct onLogin={setIsAdmin} />}
                        />

                        <Route
                            path="/admin/addProduct"
                            element={
                                isAdmin ? (
                                <AdminAddProduct />
                            ) : (
                                <AdminLogin onLogin={setIsAdmin} />
                            )
                            }
                        />

                        <Route path="/AdminLogin" element={<AdminLogin/>}></Route>
                    </Routes>
                </div>

        </CartProvider>
    );
}

export default App
