// A lightweight, stylized geographic texture. No network request or WebGL dependency.
const continents: number[][][] = [
 [[-168,66],[-145,70],[-125,60],[-110,70],[-80,73],[-54,50],[-64,44],[-80,26],[-97,16],[-106,23],[-119,34],[-128,51],[-160,58]],
 [[-82,12],[-68,10],[-51,4],[-35,-7],[-43,-23],[-54,-36],[-68,-55],[-75,-40],[-81,-6]],
 [[-17,36],[10,37],[34,31],[43,12],[51,11],[42,-12],[32,-30],[18,-35],[10,-15],[-3,4],[-17,15]],
 [[-10,36],[-10,58],[10,72],[32,69],[44,55],[70,72],[110,73],[160,60],[178,51],[144,44],[130,30],[120,20],[107,1],[96,8],[79,8],[69,25],[52,28],[42,40],[28,41],[18,38],[5,44]],
 [[112,-12],[133,-11],[153,-25],[146,-39],[116,-35]],
 [[-54,60],[-42,60],[-20,77],[-44,83],[-62,76]],
 [[47,-13],[50,-16],[48,-25],[44,-24]],
 [[130,32],[142,44],[145,39],[135,31]],
 [[166,-35],[178,-39],[173,-47],[166,-45]],
 [[95,5],[108,-7],[119,-8],[115,-3],[103,0]],
];

export function createEarthPainter(canvas: HTMLCanvasElement) {
 const size = 320;
 canvas.width = size; canvas.height = size;
 const context = canvas.getContext('2d');
 if (!context) return null;
 const texture = document.createElement('canvas');
 texture.width = 720; texture.height = 360;
 const map = texture.getContext('2d');
 if (!map) return null;
 map.fillStyle = '#124b77'; map.fillRect(0,0,720,360);
 const point = ([lon, lat]: number[]) => [(lon+180)*2,(90-lat)*2];
 continents.forEach((land, index) => {
  map.beginPath(); land.forEach((p,i) => { const [x,y] = point(p); if(i) map.lineTo(x,y); else map.moveTo(x,y); });
  map.closePath(); map.fillStyle = index === 5 ? '#c4d9db' : '#6caa95'; map.fill();
  map.strokeStyle = '#8ec6aa'; map.lineWidth = 1; map.stroke();
 });
 map.fillStyle = '#bddce7'; map.fillRect(0,344,720,16);
 // Fine meridians give this Earth the feel of an expedition instrument.
 map.strokeStyle = '#9ed4ec28'; map.lineWidth = 1;
 for(let x=0;x<720;x+=30){map.beginPath();map.moveTo(x,0);map.lineTo(x,360);map.stroke();}
 for(let y=0;y<360;y+=30){map.beginPath();map.moveTo(0,y);map.lineTo(720,y);map.stroke();}
 const pixels = map.getImageData(0,0,720,360).data;
 const output = context.createImageData(size,size);
 const samples: { offset:number; longitude:number; row:number; light:number }[] = [];
 const radius = 155;
 for(let y=0;y<size;y++) for(let x=0;x<size;x++) {
  const nx=(x-size/2)/radius, ny=(y-size/2)/radius;
  const r=nx*nx+ny*ny; if(r>1) continue;
  const z=Math.sqrt(1-r);
  samples.push({offset:(y*size+x)*4,longitude:Math.atan2(nx,z),row:Math.min(359,Math.floor((Math.asin(ny)/Math.PI+.5)*360)),light:.22+.78*Math.max(0,-nx*.45-ny*.25+z*.85)});
 }
 return (rotation: number) => {
  for(const sample of samples){
   const column=((Math.floor((sample.longitude+rotation)/(Math.PI*2)*720+360)%720)+720)%720;
   const source=(sample.row*720+column)*4;
   for(let channel=0;channel<3;channel++) output.data[sample.offset+channel]=pixels[source+channel]*sample.light;
   output.data[sample.offset+3]=255;
  }
  context.putImageData(output,0,0);
  canvas.dataset.rotation=rotation.toFixed(3);
 };
}
