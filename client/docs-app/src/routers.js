import React from "react";
import {Routes, Route} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/registration" element={<RegistrationPage/>}/>
        </Routes>
    )
}

export default AppRoutes;