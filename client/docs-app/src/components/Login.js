import React, {useState} from 'react';
import '../css/Login.css'
import {useNavigate} from "react-router-dom"

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Login:', login, 'Password:', password);
    };

    const handleClick = () => {
        navigate('/registration'); // Переход на маршрут '/registration'
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
        <div className="button-container">
          <button onClick={handleSubmit}>Войти</button>
          <button onClick={handleClick}>Зарегистрироваться</button>
        </div>
      </div>
    );
  }
  
  export default Login;