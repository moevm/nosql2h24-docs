import React, { useState } from 'react';
import '../css/Login.css'; 
import {useNavigate} from "react-router-dom"

function Registration() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика обработки регистрации
    console.log('Login:', login, 'Password:', password, 'Repeat password', repeatPassword);
    navigate('/main', { state:{username : login}}); 
  };

  return (
    <div className="container">
      <h1><span style={{ fontSize: '20px' }}>☰</span> Мои.Документы</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
        <div className="input-container">
          <input
              type="password"
              placeholder="repeat password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
          />
      </div>
      <div className="button-container">
          <button onClick={handleSubmit}>Зарегистрироваться</button>
      </div>
    </div>
  );
}

export default Registration;