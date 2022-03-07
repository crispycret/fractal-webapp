import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../assets/styles/FractalCanvas.css';


const useMountEffect = (fun:any) => useEffect(fun, [])


// Create a canvas to draw on.
export const FractalCanvas = () => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  var canvasObj = canvasRef.current;
  var ctx = canvasObj?.getContext('2d');

  var [maxIterations, setMaxIterations] = useState(13);
  var [magnificationFactor, setMagnifictionFactor] = useState(250);
  var [panX, setPanX] = useState(2.25);
  var [panY, setPanY] = useState(1.2);

  var [inverse, setInverse] = useState(true);
  var [boundry, setBoundry] = useState(5);

  useMountEffect(setup_canvas);

  useEffect(() => {
      draw_canvas();
 }, [maxIterations, magnificationFactor, panX, panY, inverse]);

 
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


    for(var x=0; x < canvasObj.width; x++) {
      for(var y=0; y < canvasObj.height; y++) {

        var mag_x =  x/magnificationFactor - panX;
        var mag_y =  y/magnificationFactor - panY;
        
        // var belongsToSet = checkIfBelongsToMandelbrotSet(mag_x, mag_y);        
        // if(belongsToSet == true) {
        //   ctx.fillRect(x,y, 1,1); 
        // }   
        
        var belongsToSet = checkIfBelongsToMandelbrotSet2(mag_x, mag_y);        
        if(belongsToSet == 0) {
          ctx.fillStyle = '#000';
          ctx.fillRect(x,y, 1,1); // Draw a black pixel
      } else {
          ctx.fillStyle = 'hsl(0, 100%, ' + belongsToSet + '%)';
          ctx.fillRect(x,y, 1,1); // Draw a colorful pixel
      }  
      } 
  }
}

  function checkIfBelongsToMandelbrotSet2 (x: number, y: number): Number{
    // var realComponentOfResult: Number = x;
    // var imaginaryComponentOfResult: Number = y;

    var real: number = x;
    var imaginary: number = y;



    for(var i = 0; i < maxIterations; i++) {
      // Calculate the real and imaginary components of the result
      // separately
      var tempRealComponent = real * real - imaginary * imaginary + x;

      var tempImaginaryComponent = 2 * real * imaginary + y;

      real = tempRealComponent;
      imaginary = tempImaginaryComponent;
    }

    // In the Mandelbrot set
    if (inverse) {
      if (real * imaginary > boundry)
      return i / maxIterations * 100.00;
    }
    else {
      if (real * imaginary < boundry)
        return i / maxIterations * 100.00;
    }

    return 0; // Not in the set
  }

 

  function focus (event: any) {
    
  }


  

  // Start drawing
  return (
    <div id="fractal-generator">
      <div id="canvas-settings">

      <div className="attribute"> 
          <label>Max Iterations</label> 
          <input type='input' defaultValue={maxIterations} onInput={event => setMaxIterations(Number(event.currentTarget.value))}/> 
        </div>

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

        <div className="attribute"> 
          <label>Inverse</label> 
          <input type='checkbox' checked={inverse} onChange={event => setInverse(!inverse)}/> 
        </div>

        <div className="attribute"> 
          <label>Boundry</label> 
          <input type='input' defaultValue={boundry} onInput={event => setBoundry(Number(event.currentTarget.value))}/> 
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
