import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../assets/styles/FractalCanvas.css';


const useMountEffect = (fun:any) => useEffect(fun, [])


// Create a canvas to draw on.
export const FractalCanvas = () => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  var canvasObj = canvasRef.current;
  var ctx = canvasObj?.getContext('2d');

  var [magnificationFactor, setMagnifictionFactor] = useState(200);
  var [panX, setPanX] = useState(2);
  var [panY, setPanY] = useState(1.5);

  useMountEffect(setup_canvas);

  useEffect(() => {
      draw_canvas();
 }, []);

 
  function setup_canvas() {
    canvasObj = canvasRef?.current;
    ctx = canvasObj?.getContext('2d');

    if (canvasRef == null) return;
    if (canvasObj == null) return;
    if (ctx == null) return;

    canvasObj.width=800;
    canvasObj.height=600;

    clear_canvas();
  }

  function clear_canvas() {
    if (canvasRef == null) return;
    if (canvasObj == null) return;
    if (ctx == null) return;
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height)
  }

  function draw_canvas() {
    
    clear_canvas();

    if (canvasObj == null) return;
    if (ctx == null) return;

    // var magnificationFactor = 600;
    // var panX = 0;
    // var panY = 0;

   

    for(var x=0; x < canvasObj.width; x++) {
      for(var y=0; y < canvasObj.height; y++) {

        var mag_x =  x/magnificationFactor - panX;
        var mag_y =  y/magnificationFactor - panY;
        
        var belongsToSet = checkIfBelongsToMandelbrotSet(mag_x, mag_y);
        
        if(belongsToSet == true) {
          ctx.fillRect(x,y, 1,1); 
        }                
      } 
  }
}



  function checkIfBelongsToMandelbrotSet (x: number, y: number): Boolean{
    // var realComponentOfResult: Number = x;
    // var imaginaryComponentOfResult: Number = y;

    var real: number = x;
    var imaginary: number = y;


    for(var i = 0; i < 10; i++) {
      // Calculate the real and imaginary components of the result
      // separately
      var tempRealComponent = real * real - imaginary * imaginary + x;

      var tempImaginaryComponent = 2 * real * imaginary + y;

      real = tempRealComponent;
      imaginary = tempImaginaryComponent;
    }

    if (real * imaginary < 5)
      return true; // In the Mandelbrot set

    return false; // Not in the set
  }

 

  function focus (event: any) {
    
  }


  

  // Start drawing
  return (
    <div id="fractal-generator">
      <div id="canvas-settings">

        <div className="attribute"> 
          <label>Magnification Factor</label> 
          <input type='input' defaultValue={magnificationFactor} onInput={event => setMagnifictionFactor(Number(event.currentTarget.value))}/> 
        </div>
        
        <div className="attribute"> 
          <label>Pan X</label> 
          <input type='input' defaultValue={panX} onInput={event => setPanX(Number(event.currentTarget.value))}/> 
        </div>
        
        <div className="attribute"> 
          <label>Pan Y</label> 
          <input type='input' defaultValue={panY} onInput={event => setPanY(Number(event.currentTarget.value))}/> 
        </div>
        
        <button onClick={ event => draw_canvas() }>Draw Canvas</button>
      </div>

      <div id="canvas-container">
        <canvas id="canvas" ref={ canvasRef } onMouseMove={ event => focus(event) }></canvas>
      </div>

      <div>
        <div id="footer">

        </div>
      </div>
    </div>
  );
}
