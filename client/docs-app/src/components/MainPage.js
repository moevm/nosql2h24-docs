import React, {useState} from 'react';
import '../css/Login.css'
import {useNavigate} from "react-router-dom"

function Main() {
    const navigate = useNavigate();
  
    const handleExit = (e) => {
      e.preventDefault();
      navigate('/'); // Переход на маршрут '/'
    };

    const handleDocuments = () => {
        navigate('/documents', ); // Переход на маршрут '/documents'
    };
  
    return (
      <div className="container">
        <h1><span style={{ fontSize: '20px' }}>☰</span> Мои.Документы</h1>
        <div className="button-container">
          <button onClick={handleExit}>Выйти</button>
          <button onClick={handleDocuments}>Документы</button>
          <button onClick={handleDocuments}>Импорт</button>
          <button onClick={handleDocuments}>Экспорт</button>
        </div>
      </div>
    );
  }
  
  export default Main;