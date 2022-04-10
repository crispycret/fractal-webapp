import React from 'react';
import { useState, useEffect, useRef } from 'react';

import './assets/styles/App.css';


import ButtonAppBar from "./components/navigation/ButtonAppBar" ;
import ResponsiveAppBar from "./components/navigation/ResponsiveAppBar";
import SimpleBottomNavigation from "./components/navigation/SimpleBottomNavigation";

import FractalCanvas from './components/FractalCanvas';


function App() {

  useEffect(() => {}, []);


  return (
    <div className="App">

      <ResponsiveAppBar />

      <FractalCanvas />

      <SimpleBottomNavigation />

    </div>
  );
}


export default App;


