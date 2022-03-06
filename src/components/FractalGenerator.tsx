import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../assets/styles/FractalCanvas.css';


// Create a canvas to draw on.
export const FractalCanvas = () => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  var canvasObj = canvasRef.current;
  var ctx = canvasObj?.getContext('2d');

  useEffect(() => {
    clear_canvas();
    setup_canvas();
 });

 
  function setup_canvas() {
    canvasObj = canvasRef?.current;
    ctx = canvasObj?.getContext('2d');

    if (canvasRef == null) return;
    if (canvasObj == null) return;
    if (ctx == null) return;

    canvasObj.width=600;
    canvasObj.height=600;

    clear_canvas();
  }

  function clear_canvas() {
    if (canvasRef == null) return;
    if (canvasObj == null) return;
    if (ctx == null) return;
    
    ctx.fillRect(0, 0, canvasObj.width, canvasObj.height);
  }

  function draw_canvas() {

  }

  function whiteout_canvas() {
    if (canvasObj == null) return;
    if (ctx == null) return;

    ctx.fillStyle = 'white';

    for(var x=0; x < canvasObj.width; x++) {
      for (var y=0; y < canvasObj.height; y++) {
        ctx.fillRect(x, y, 1, 1)
      }
    }
  }

  function blackout_canvas() {
    if (canvasObj == null) return;
    if (ctx == null) return;

    ctx.fillStyle = 'black';

    for(var x=0; x < canvasObj.width; x++) {
      for (var y=0; y < canvasObj.height; y++) {
        ctx.fillRect(x, y, 1, 1)
      }
    }
  }
  

  // Start drawing
  return (
    <div>
      <div id="canvas-settings">
        <button onClick={ event => whiteout_canvas() }>Whiteout Canvas</button>
        <button onClick={ event => blackout_canvas() }>Blackout Canvas</button>
      </div>
      <div id="canvas-container">
        <canvas id="canvas" ref={ canvasRef }></canvas>
      </div>
    </div>
  );
}
