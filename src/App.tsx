import React from 'react';
import { useState, useEffect, useRef } from 'react';

import './assets/styles/App.css';

import logo from './assets/imgs/logo.svg';
import { generate_mandelbrot, GenerateMandelbrotStruct } from './apis/fractals_api';
import { save_mandelbrot, SaveMandelbrotStruct } from './apis/fractals_api';
import { draw_mandelbrot } from './helpers/CanvasHandler';

const useMountEffect = (fun: any) => useEffect(() => {fun()}, [])


function App() {

  const generateBtnRef = useRef<HTMLButtonElement>(null)
  const [generateBtnText, setGenerateBtnText] = useState<String>("Generate")

  const canvasRef = useRef<HTMLCanvasElement>(null)
  var canvasObj: HTMLCanvasElement | null = null
  var ctx: CanvasRenderingContext2D | null = null

  var DEFAULT_PARAMS = {
    width: String(800) ,
    height: String(400),
    zoom: String(300),
    iters: String(100),
    bounds: String(2),
    camx: String(1.9),
    camy: String(1),
  }

  var params = {
    width: useState<string>(DEFAULT_PARAMS.width),
    height: useState<string>(DEFAULT_PARAMS.height),
    zoom: useState<string>(DEFAULT_PARAMS.zoom),
    iters: useState<string>(DEFAULT_PARAMS.iters),
    bounds: useState<string>(DEFAULT_PARAMS.bounds),
    camx: useState<string>(DEFAULT_PARAMS.camx),
    camy: useState<string>(DEFAULT_PARAMS.camy),
  }


  const generate_btn_states = ["Generate", "Loading"]

  const generateClick = (value:any) =>
  {
    setGenerateBtnText(generate_btn_states[1])
    setup().then(() => {
      setGenerateBtnText(generate_btn_states[0])
    })
  }

  const setup = async () => {
    
    canvasObj = canvasRef.current;
    if (canvasObj == null) return
    ctx = canvasObj.getContext('2d');

    canvasObj.width = parseInt(params.width[0])
    canvasObj.height = parseInt(params.height[0])

    console.log("SETUP COMPLETE")

    await draw();
  }


  const saveClick = async () => {
    const temp = {
      author: "unknown",
      label: "mandelbrot",
      width: params.width[0],
      height: params.height[0],
      zoom: params.zoom[0],
      iters: params.iters[0],
      bounds: params.bounds[0],
      camx: params.camx[0],
      camy: params.camy[0],
    }

    
    const res = await save_mandelbrot(temp as SaveMandelbrotStruct)
  }

  const draw = async () => {

    
    if (canvasObj == null) return
   

    const temp = {
      width: params.width[0],
      height: params.height[0],
      zoom: params.zoom[0],
      iters: params.iters[0],
      bounds: params.bounds[0],
      camx: params.camx[0],
      camy: params.camy[0],
    }
    console.log("DRAWss")

    console.log("Gen")

    const content = await generate_mandelbrot(temp as GenerateMandelbrotStruct)

    console.log(content)

    if (ctx == null || content == null) return

    console.log("Fill")

    draw_mandelbrot(ctx, Number(temp.iters), content)
    return;
  }

 
  
  useEffect(() => { // Pass in a callback function!
    setup();
  }, []);


  return (
    <div className="App">

      <div id='canvas-container' >
        <div id='parameters'>
  
          <div className="param"> 
            <label>Width</label> 
            <input type='input' value={ params.width[0] } onInput={event => { params.width[1](event.currentTarget.value)}}/> 
          </div>
  
          <div className="param"> 
            <label>Height</label> 
            <input type='input' value={ params.height[0] } onInput={event => { params.height[1](event.currentTarget.value)}}/> 
          </div>

  

          <div className="param"> 
            <label>Magnification</label> 
            <input type='input' value={ params.zoom[0] } onInput={event => { params.zoom[1](event.currentTarget.value)}}/> 
          </div>
          
          <div className="param"> 
            <label>Iterations</label> 
            <input type='input' value={ params.iters[0] } onInput={event => { params.iters[1](event.currentTarget.value)}}/> 
          </div>
          
          <div className="param"> 
            <label>Boundary</label> 
            <input type='input' value={ params.bounds[0] } onInput={event => { params.bounds[1](event.currentTarget.value)}}/> 
          </div>
          
          <div className="param"> 
            <label>Position X</label> 
            <input type='input' value={ params.camx[0] } onInput={event => { params.camx[1](event.currentTarget.value)}}/> 
          </div>
          
          <div className="param"> 
            <label>Position Y</label> 
            <input type='input' value={ params.camy[0] } onInput={event => { params.camy[1](event.currentTarget.value)}}/> 
          </div>

          <button ref={generateBtnRef} onClick={event => generateClick(event.currentTarget.value)}>{ generateBtnText }</button>
        <button onClick={event => saveClick()}>Save</button>
        </div>
        

        <canvas id='canvas' ref={ canvasRef } onClick={ event => draw()}></canvas>
      </div>

    </div>
  );
}




export default App;
