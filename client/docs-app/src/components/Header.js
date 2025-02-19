import React, {useState} from 'react'
import "../css/Base.css"
import '../css/Header.css'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo';

function Header() {
    const [userName, setUsername] = useState("");
    const navigate = useNavigate();

    const handleExit = () => {
        navigate("/main", {state: {userName: userName }});
    }

    const handleDocuments = () => {
        navigate("/document_list")
    }

    return (
        <div className='header'>
            <Logo/>
            <div className='header-username'>
                <h2>{userName}</h2>
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