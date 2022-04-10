



// Color using normal method
// mask over with mandelbrot coloring schema to draw shapes on




export const draw_mandelbrot = (ctx:any, max_iters:number, content:any) => {

  color_in_set(ctx, content[0][0], content[1])

  color_out_set(ctx, content[0][1])
   

}







export const color_out_set = (ctx:any, out_set:any) => {


  var last_x = null;
  var last_y = null;
  var [c1, c2] = [0, 100];

  for (var point in out_set) {

    var x = parseInt(out_set[point][0]);
    var y = parseInt(out_set[point][1]);
   
    if (last_x == null) last_x = x
    if (last_y == null) last_y = y

    if (last_x < x) {
      last_x = x
      c1 += 3
    }

    if (last_y < y) {
      last_y = y
      c2 -= 3
    }

    
    if (c2 <= -1) c2 = 100


    if (c1 >= 120) {
      c1 = 0
      // c2 -= 3
      // if (c2 <= -1) c2 = 250
    }

    ctx.fillStyle = 'hsl(' + c2 +  ', ' + c2 + '%, ' + 100 + '%)';
    ctx.fillRect(x, y, 1, 1)  

  }


}








export const color_in_set  = (ctx:any, in_set:any, max_iter_reached:number) => {


  var last_x = null;
  var last_y = null;
  var [c1, c2] = [0, 100];

  for (var point in in_set) {

    var x = parseInt(in_set[point][0]);
    var y = parseInt(in_set[point][1]);
    var i = parseInt(in_set[point][2]);

    var colorValue = i / max_iter_reached * 100

    if (colorValue >= 99) colorValue = 99

    if (last_x == null) last_x = x
    if (last_y == null) last_y = y

    if (last_y < y) {
      last_y = y
      c1 += Number(Math.random() * 5)
      
      c2 -= Number(Math.random() * 5)
      // c2 += 5
    }

    if (last_x > x) {
      last_x = x
      c1 += 2
    }


    if (c2 <= 3) c2 = 100

    if (c1 >= 320) {
      c1 = 0
      // c2 -= 3
      if (c2 <= -5) c2 = 100
    }

    // ctx.fillStyle = 'hsl(' + c1 +  ', ' + c2 + '%, ' + colorValue + '%)';
    ctx.fillStyle = 'hsl(' + Number(Math.random() * 30) +  ', ' + Number(Math.random() * 30) + '%, ' + colorValue + '%)';
    ctx.fillRect(x, y, 1, 1)  
  }
  
}





























