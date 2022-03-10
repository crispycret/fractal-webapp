import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../assets/styles/FractalCanvas.css';

const react_csv = require('react-csv');


const useMountEffect = (fun:any) => useEffect(fun, [])


// Create a canvas to draw on.
export const FractalCanvas = () => {
  
  // Canvas Elements
  const canvasRef = useRef<HTMLCanvasElement>(null);
  var canvasObj = canvasRef.current;
  var ctx = canvasObj?.getContext('2d');

  // Default parameters to calculate the mandelbrot set numbers.
  const defaultMaxIterations = 250.0;
  const defaultMagnification = 250.0;
  const defaultPanX = 2.25;
  const defaultPanY = 1.2;

  // Mandelbrot set parameters
  var [maxIterations, setMaxIterations] = useState(String(defaultMaxIterations));
  var [magnificationFactor, setMagnifictionFactor] = useState(String(defaultMagnification));
 
  var [boundry, setBoundry] = useState('5');
  var [inverse, setInverse] = useState(false);
  
  var [panX, setPanX] = useState(String(defaultPanX));
  var [panY, setPanY] = useState(String(defaultPanY));
  
  var [xOffset, setXOffset] = useState('0');
  var [yOffset,setYOffset] = useState('0');
  


  // Record Data to CSV 

  const headers = [
    {label:"Iteration", key: "iter"},
    {label:"Magnification", key: "mag"},
    {label:"Boundry", key: "boundry"},
    {label:"Inverse", key: "inverse"},
    {label:"Panel X", key: "panX"}, 
    {label:"Panel Y", key: "panY"}, 
    {label:"Magnification X", key: "magX"}, 
    {label:"Magnification Y", key: "magY"}, 
    {label:"X Offset", key: "xOffset"}, 
    {label:"Y Offset", key: "YOffset"}, 
  ];

  var data:Array<any> = [];
  var iterationData = {};

  const csvReport = {
    data: data,
    headers: headers,
    filename: 'mandelbrot_001.csv'
  };





  useMountEffect(setup_canvas);

  useEffect(() => {
      draw_canvas();
 }, []
//  [maxIterations, magnificationFactor, panX, panY, inverse, xOffset, yOffset]
 );





 
  function setup_canvas() {
    canvasObj = canvasRef?.current;
    ctx = canvasObj?.getContext('2d');

    if (canvasObj == null) return;

    canvasObj.width=800;
    canvasObj.height=600;

  }

  function clear_canvas() {
    if (canvasObj == null) return;
    if (ctx == null) return;
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height)
  }

  function draw_canvas() {
    

    console.log("draw_canvas(); %f", magnificationFactor);

    clear_canvas();

    if (canvasObj == null) return;
    if (ctx == null) return;


    for(var x=0; x < canvasObj.width; x++) {
      for(var y=0; y < canvasObj.height; y++) {

        var mag_x =  x / Number(magnificationFactor) - Number(panX);
        var mag_y =  y / Number(magnificationFactor) - Number(panY);
          
        var belongsToSet = checkIfBelongsToMandelbrotSet (mag_x, mag_y);       

        if(belongsToSet == 0) {
          ctx.fillStyle = '#000';
          ctx.fillRect(x,y, 1,1); // Draw a black pixel
        } 
        
        else {
          ctx.fillStyle = 'hsl(220, 100%, ' + belongsToSet + '%)';
          ctx.fillRect(x,y, 1,1); // Draw a colorful pixel
        }

      } 
    }
  }

  function checkIfBelongsToMandelbrotSet (x: number, y: number): Number{

    var real: number = x;
    var imaginary: number = y;


    for(var i = 0; i < Number(maxIterations); i++) {
      // Calculate the real and imaginary components of the result separately
      var tempRealComponent = real * real - imaginary * imaginary + x;
      var tempImaginaryComponent = 2 * real * imaginary + y;

      real = tempRealComponent;
      imaginary = tempImaginaryComponent;

      
      // Return a number as a percentage
      if (inverse){
        if(real * imaginary < Number(boundry))
          return (i/Number(maxIterations) * 100);
      }
      else {
        if(real * imaginary > Number(boundry))
          return (i/Number(maxIterations) * 100);
    } 
      
    }
    return 0;   // Return zero if in set 

    }



  function focusEvent (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {

    // function focus (event: MouseEvent) {
    // console.log(event.clientX);
    // console.log(event.offsetX);

    var wmin = 0;
    var hmin = 0;
    var wmax = canvasObj?.width;
    var hmax = canvasObj?.height;

    // panX = event.offsetX;
    // panY = event.offsetY;

    focus();
  }

  function focus() {
    var multiplier: number  = (defaultMagnification / Number(magnificationFactor))

    var offset = Number(xOffset) / Number(magnificationFactor);
    setPanX(String(defaultPanX * multiplier + offset));

    offset = Number(yOffset) / Number(magnificationFactor);
    setPanY(String(defaultPanY * multiplier + offset));
  }



  

  // Start drawing
  return (
    <div id="fractal-generator">
      <div id="canvas-settings">

      <div className="attribute"> 
          <label>Max Iterations</label> 
          <input type='input' defaultValue={maxIterations} value={ maxIterations } onInput={event => setMaxIterations(event.currentTarget.value)}/> 
        </div>

        <div className="attribute"> 
          <label>Magnification Factor</label> 
          <input type='input' defaultValue={magnificationFactor} value={ magnificationFactor } onInput={event => setMagnifictionFactor(event.currentTarget.value)}/> 
        </div>
        
        <div className="attribute"> 
          <label>Pan X</label> 
          <input type='input' defaultValue={panX} value={ panX } onInput={event => setPanX(event.currentTarget.value)}/> 
        </div>
        
        <div className="attribute"> 
          <label>Pan Y</label> 
          <input type='input' defaultValue={panY} value={ panY } onInput={event => setPanY(event.currentTarget.value)}/> 
        </div>
        
        <div className="attribute"> 
          <label>X Offset</label> 
          <input type='input' defaultValue={xOffset} value={ xOffset } onInput={event => setXOffset(event.currentTarget.value)}/> 
        </div>
        
        <div className="attribute"> 
          <label>Y Offset</label> 
          <input type='input' defaultValue={yOffset} value={ yOffset } onInput={event => setYOffset(event.currentTarget.value)}/> 
        </div>

        <div className="attribute"> 
          <label>Inverse</label> 
          <input type='checkbox' checked={inverse} onInput={event => setInverse(!inverse)}/> 
        </div>

        <div className="attribute"> 
          <label>Boundry</label> 
          <input type='input' defaultValue={boundry} value={ boundry } onInput={event => setBoundry(event.currentTarget.value)}/> 
        </div>
        
        <button onClick={ event => draw_canvas() } >Draw Canvas</button>
      </div>

      <div id="canvas-container">
        <canvas id="canvas" ref={ canvasRef } onMouseMove={ event => focusEvent(event) }></canvas>
      </div>

      <div>
        <div id="footer">

        </div>
      </div>
    </div>
  );
}
