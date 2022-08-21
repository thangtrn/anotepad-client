import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Note from "./pages/Note";

function App() {
    return (
        <div className="font-mono">
            <Header />
            <div className="min-h-[calc(100vh-56px)] bg-[#eee8d5] mt-14">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/forgot_password"
                        element={<ForgotPassword />}
                    />
                    <Route path="/note/:id" element={<Note />} />
                    <Route path="/setting" element={<Home />} />
                </Routes>
            </div>
            <ToastContainer
                className="mt-10"
                position="top-right"
                autoClose={5000}
                pauseOnHover={false}
            />
        </div>
    );
}

export default App;
