


export const draw_mandelbrot = (ctx:any, content:any) => {
    
  console.log('draw_mandelbrot');
  var in_set:any = content[0]
  var out_set:any = content[1]

  var u = 0
  for (var point in in_set) {

    var x = parseInt(in_set[point][0]);
    var y = parseInt(in_set[point][1]);
    var i = parseInt(in_set[point][2]);

    var colorValue = i / 300 * 100
    
    ctx.fillStyle = 'hsl(0, 100%, ' + colorValue + '%)';
    ctx.fillRect(x, y, 1, 1)
  }

  for (var point in out_set) {
    var x = parseInt(point[0]);
    var y = parseInt(point[1]);

    ctx.fillStyle = 'hsl(220, 100%, ' + 30 + '%)';
    ctx.fillRect(x, y, 1, 1)
  }
}





// export const draw_mandelbrot = (ctx:any, content:any) => {
    
//   var in_set:any = content.in
//   var out_set:any = content.out

//   for (var idx in in_set) {
//     // console.log(idx);
//     // console.log(in_set[idx]);
//     var colorValue = in_set[idx].i / 300 * 100
//     ctx.fillStyle = 'hsl(0, 100%, ' + colorValue + '%)';
//     ctx.fillRect(in_set[idx].x,in_set[idx].y, 1, 1)
//     // return

//   }

//   var i = 0
//   for (var idx in out_set) {

//     ctx.fillStyle = 'hsl(220, 100%, ' + 30 + '%)';
//     ctx.fillRect(out_set[idx].x, out_set[idx].y, 1, 1)
//   }
// }