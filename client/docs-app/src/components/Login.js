import axios from "axios"
import React, {useState} from 'react';
import '../css/Base.css'
import '../css/Login.css'
import {data, useNavigate} from "react-router-dom"
import Logo from './Logo';
import { SERVER } from '../routers';

function Login() {
    const [loginStatus, setLoginStatus] = useState('')
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post(SERVER + "/login",
         {
          "login": login, 
          "password": password
        },  
        { 
          headers: {
            "Access-Control-Allow-Credintals": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,GET,HEAD,PATCH,DELETE",
            "Content-Type": 'application/json'
          } 
        })
        .then((res) => {
          console.log(res.data)
          if (res.data.success)
            navigate('/main', { state:{username : login}}); // Переход на маршрут '/main'
          else 
            setLoginStatus("Неправильный логин или пароль")
        })
        .catch((error) => {
          console.log(error)
        })
      // let res = fetch(
      //   SERVER + "/login",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Access-Control-Allow-Credintals": "*",
      //       "Access-Control-Allow-Origin": "*",
      //       "Access-Control-Allow-Methods": "GET,POST,PUT,GET,HEAD,PATCH,DELETE",
      //       "Content-Type": 'application/json'
      //     },
      //     body: {
      //       'login': login,
      //       'password': password
      //     }
      //   }
      // )
      console.log('Login:', login, 'Password:', password);
    };

    const handleClick = () => {
        navigate('/registration'); // Переход на маршрут '/registration'
    };
  
    return (
      <div className='login-main'>
        <div className="container">
          <Logo/>
          <div className="input-container-label">
            <label  >{loginStatus}</label>
          </div>
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