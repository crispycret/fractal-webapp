import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import axios from 'axios';

import './assets/styles/App.css';

import { Layout, Header, Footer } from './pages/Layout';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import FractalEngine from './pages/FractalEngine';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';
import Dashboard from './pages/Dashboard';
import useToken from './components/useToken'

function App() {

  useEffect(() => {}, []);

  const { token, removeToken, setToken } = useToken();


  function logout() {
    axios({
      method: "POST",
      url:"/logout",
    })
    .then((response) => {
       removeToken()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}


  function login(email:string, password:string) {
      let res = axios({
        method: "POST",
        url:"/token",
        data:{
          email: email,
          password: password
         }
      })
      .then((response) => {
        // pass the retrieved access_token to useToken.setToken through a prop.
        setToken(response.data.access_token)
      
      }).catch((error) => {
          // Log any errors.
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
          }
      })
    }


    const auth = {
      token,
      setToken,
      removeToken,
      logout,
      login
    };

  return (
    <div className="App">

      <h2>Fractal Engine</h2>
      
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout {...auth}/>}>
              <Route index element={<Home {...auth}/>} />
              <Route path="logout" element={<Home {...auth}/>} />
              <Route path="login" element={<Login {...auth}/>} />
              <Route path="register" element={<Register {...auth}/>} />
              <Route path="engine" element={<FractalEngine {...auth}/>} />
              <Route path="user" element={<User {...auth}/>} />
              <Route path="dashboard" element={<Dashboard {...auth}/>} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>

          <Footer />

        </BrowserRouter>

    </div>
  );
}


export default App;


