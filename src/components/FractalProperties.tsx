import React, { useState } from 'react';


export interface FractalParamterProps {
    maxIterations?: 250,
    magnificationFactor?: 250,
    boundry?: 5,
    inverse?: false,
    panX?: 2.25,
    panY?: 1.2,
    xOffset?: 0,
    yOffset?: 0,
    draw_canvas: {(): void},
}; 

export const FractalProperties = (props: FractalParamterProps) => {
  
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
    
  
    return (
    <div id="fractal-properties">

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

        <button onClick={ event => props?.draw_canvas() } >Draw Canvas</button>
    </div>

    );
  
}



export default FractalProperties;