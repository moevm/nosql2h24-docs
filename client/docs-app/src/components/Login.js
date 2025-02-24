import React, {useState} from 'react';
import '../css/Base.css'
import '../css/Login.css'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import Logo from './Logo';
import { SERVER } from '../routers';

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.AxiosHeaders.set
      axios.get(SERVER + "/login", { data: {"login": login, "password": password}})
      console.log('Login:', login, 'Password:', password);
      navigate('/main', { state:{username : login}}); // Переход на маршрут '/main'
    };

    const handleClick = () => {
        navigate('/registration'); // Переход на маршрут '/registration'
    };
  
    return (
      <div className='login-main'>
        <div className="container">
          <Logo/>
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
      </div>
    );
  }
  
  export default Login;