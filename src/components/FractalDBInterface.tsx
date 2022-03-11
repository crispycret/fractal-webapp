
// Record Data to CSV 
export const headers = [
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

export var data:Array<any> = [];
export var iterationData = {};

export const csvReport = {
  data: data,
  headers: headers,
  filename: 'mandelbrot_001.csv'
};


export const write = () => {

}

export const read = () => {

}
