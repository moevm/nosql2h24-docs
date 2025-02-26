import React, {useState} from 'react'
import "../css/Base.css"
import '../css/Header.css'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo';
import { useLocation } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();  
    const location = useLocation();
    // const username = location.state || {}

    const handleExit = () => {
        navigate("/main");
    }

    const handleDocuments = () => {
        navigate("/document_list")
    }

    return (
        <div className='header'>
            <Logo/>
            <div className='header-username'>
                {/* <h2>{username.username}</h2> */}
            </div>
            <div className='header-documents' >
                <h2 className="header-documents-h2" onClick={handleDocuments}>Документы</h2>
            </div>
            <div className='header-main' >
                <h2 className='header-main-h2' onClick={handleExit}>На главную</h2>
            </div>
        </div>
    )
}

export default Header