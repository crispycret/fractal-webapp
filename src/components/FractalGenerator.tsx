import React from 'react';
import { useState, useEffect, useRef } from 'react';

import FractalProperties, { FractalParamterProps } from './FractalProperties';
import { FractalCanvas, FractalCanvasProps } from './FractalCanvas';

import '../assets/styles/FractalCanvas.css';

const react_csv = require('react-csv');


const useMountEffect = (fun:any) => useEffect(fun, [])


// Create a canvas to draw on.
export const FractalGenerator = () => {

  
  useEffect(() => {
      draw_canvas();
 }, []
 );


  var parameters = {
      maxIterations: 250,
      magnificationFactor: 250,
      boundry: 5,
      inverse: false,
      panX: 2.25,
      panY: 1.2,
      xOffset: 0,
      yOffset: 0,
      draw_canvas: () => {}
  }


  function draw_canvas() {
    

    var temp: FractalParamterProps = parameters;

    console.log(temp);


    // console.log("draw_canvas(); %f", magnificationFactor);

    // clear_canvas();

    // if (canvasObj == null) return;
    // if (ctx == null) return;


    // for(var x=0; x < canvasObj.width; x++) {
    //   for(var y=0; y < canvasObj.height; y++) {

    //     var mag_x =  x / Number(magnificationFactor) - Number(panX);
    //     var mag_y =  y / Number(magnificationFactor) - Number(panY);
          
    //     var belongsToSet = checkIfBelongsToMandelbrotSet (mag_x, mag_y);       

    //     if(belongsToSet == 0) {
    //       ctx.fillStyle = '#000';
    //       ctx.fillRect(x,y, 1,1); // Draw a black pixel
    //     } 
        
    //     else {
    //       ctx.fillStyle = 'hsl(220, 100%, ' + belongsToSet + '%)';
    //       ctx.fillRect(x,y, 1,1); // Draw a colorful pixel
    //     }

    //   } 
    // }
  }

  // function checkIfBelongsToMandelbrotSet (x: number, y: number): Number{

    // var real: number = x;
    // var imaginary: number = y;


    // for(var i = 0; i < Number(maxIterations); i++) {
    //   // Calculate the real and imaginary components of the result separately
    //   var tempRealComponent = real * real - imaginary * imaginary + x;
    //   var tempImaginaryComponent = 2 * real * imaginary + y;

    //   real = tempRealComponent;
    //   imaginary = tempImaginaryComponent;

      
    //   // Return a number as a percentage
    //   if (inverse){
    //     if(real * imaginary < Number(boundry))
    //       return (i/Number(maxIterations) * 100);
    //   }
    //   else {
    //     if(real * imaginary > Number(boundry))
    //       return (i/Number(maxIterations) * 100);
    // } 
      
    // }
    // return 0;   // Return zero if in set 

    // }



  function focusEvent (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {

    // function focus (event: MouseEvent) {
    // console.log(event.clientX);
    // console.log(event.offsetX);

    // var wmin = 0;
    // var hmin = 0;
    // var wmax = canvasObj?.width;
    // var hmax = canvasObj?.height;

    // panX = event.offsetX;
    // panY = event.offsetY;

    focus();
  }

  function focus() {
    // var multiplier: number  = (defaultMagnification / Number(magnificationFactor))

    // var offset = Number(xOffset) / Number(magnificationFactor);
    // setPanX(String(defaultPanX * multiplier + offset));

    // offset = Number(yOffset) / Number(magnificationFactor);
    // setPanY(String(defaultPanY * multiplier + offset));
  }



  

  // Start drawing
  return (
    <div id="fractal-generator">
      <FractalProperties draw_canvas={() => draw_canvas}/>
      <div id="canvas-container">
        {/* <canvas id="canvas" ref={ canvasRef } onMouseMove={ event => focusEvent(event) }></canvas> */}
      </div>

      <div>
        <div id="footer">

        </div>
      </div>
    </div>
  );
}
