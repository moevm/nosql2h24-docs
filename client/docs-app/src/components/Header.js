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
            <div className='header-documents' onClick={handleDocuments}>
                <h2>Документы</h2>
            </div>
            <div className='header-main'>
                <button onClick={handleExit}>На главную</button>
            </div>
        </div>
    )
}

export default Header