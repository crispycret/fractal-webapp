import React, { useEffect } from 'react';
import { useState, useRef } from 'react';


const useMountEffect = (fun: any) => useEffect(fun, []);


export interface FractalCanvasProps {
    "width": 800,
    "height": 600,
};

export const FractalCanvas = (props: FractalCanvasProps) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    var canvasObj = canvasRef.current;
    var ctx = canvasObj?.getContext('2d');


    useMountEffect(setup_canvas);
  
 
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
  


}


export default FractalCanvas;


