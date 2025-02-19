import React, {useState} from 'react';
import '../css/Login.css'
import {useNavigate} from "react-router-dom"
import { useLocation } from "react-router-dom";
import Logo from './Logo';

function Main(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state || {}

    const handleExit = (e) => {
      e.preventDefault();
      navigate('/'); // Переход на маршрут '/'
    };

    const handleDocuments = () => {
        navigate('/document_list',{ state:{username : username.username}}); // Переход на маршрут '/documents'
    };
  
    return (
      <div className='login-main'>
        <div className="container">
          <Logo/>
          <div className="button-container">
            <button onClick={handleExit}>Выйти</button>
            <button onClick={handleDocuments}>Документы</button>
            <button onClick={handleDocuments}>Импорт</button>
            <button onClick={handleDocuments}>Экспорт</button>
          </div>
        </div>
      </div>
    );
  }
  
export default Main;