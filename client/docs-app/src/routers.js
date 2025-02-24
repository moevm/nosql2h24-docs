import React from "react";
import {Routes, Route} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";
import DocumentList from "./components/DocumentList";
import DocumentInfo from "./components/DocumentInfo";
import DocumentEdit from "./components/DocumentEdit";
import VersionList from "./components/VersionsList";
function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/registration" element={<RegistrationPage/>}/>
            <Route path="/main" element={<MainPage/>}/>
            <Route path="/document_list" element={<DocumentList/>}/>
            <Route path="/document_info/:id" element={<DocumentInfo/>}/>
            <Route path="/document_edit/:id" element={<DocumentEdit/>}/>
            <Route path="/versions_list/:id" element={<VersionList/>}/>
        </Routes>
    )
}

export default AppRoutes;
export const SERVER = 'http://localhost:5000'