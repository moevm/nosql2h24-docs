import React from "react";
import {Routes, Route} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/registration" element={<RegistrationPage/>}/>
            <Route path="/main" element={<MainPage/>}/>
        </Routes>
    )
}

export default AppRoutes;