import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../assets/styles/FractalCanvas.css';


const useMountEffect = (fun:any) => useEffect(fun, [])


// Create a canvas to draw on.
export const FractalCanvas = () => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  var canvasObj = canvasRef.current;
  var ctx = canvasObj?.getContext('2d');

  const focusPoint = 0;

  const defaultMagnification = 250.0;
  const defaultPanX = 2.25;
  const defaultPanY = 1.2;

  var [maxIterations, setMaxIterations] = useState('13');
  var [magnificationFactor, setMagnifictionFactor] = useState(String(defaultMagnification));
  var [panX, setPanX] = useState(String(defaultPanX));
  var [panY, setPanY] = useState(String(defaultPanY));
  
  var [xOffset, setXOffset] = useState('0');
  var [yOffset,setYOffset] = useState('0');
  
  var [boundry, setBoundry] = useState('5');
  var [inverse, setInverse] = useState(true);

  useMountEffect(setup_canvas);

  useEffect(() => {
      draw_canvas();
 }, [maxIterations, magnificationFactor, panX, panY, inverse, xOffset, yOffset]);

 
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

        var mag_x =  x/Number(magnificationFactor) - Number(panX);
        var mag_y =  y/Number(magnificationFactor) - Number(panY);
        
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

    var real: number = x;
    var imaginary: number = y;


    for(var i = 0; i < Number(maxIterations); i++) {
      // Calculate the real and imaginary components of the result separately
      var tempRealComponent = real * real - imaginary * imaginary + x;
      var tempImaginaryComponent = 2 * real * imaginary + y;

      real = tempRealComponent;
      imaginary = tempImaginaryComponent;
    }

    // In the Mandelbrot set
    if (inverse) {
      if (real * imaginary > Number(boundry))
      return i / Number(maxIterations) * 100.00;
    }
    else {
      if (real * imaginary < Number(boundry))
        return i / Number(maxIterations) * 100.00;
    }

    return 0; // Not in the set
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

    setPanX(String(defaultPanX * multiplier + Number(xOffset)));    
    setPanY(String(defaultPanY * multiplier + Number(yOffset)));
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
