window.onload=function() {
    canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    setInterval(game,1000/5);
}

px=py=10;
gs=tc=20;
var ax, ay;
xv=1;
yv=0;
snake=[];
lunghezza = 5;
muro = [];
livello=0;
key_pressed = null;

nuovamela();

muri = [
  function (){
    muro = []
  },
  function (){
    muro=[];
    for(var i=0;i<tc;i++){
      muro.push({x:i,y:0});
      muro.push({x:i,y:tc-1});
    }
  },
  function (){
    muro=[];
    for(var i=0;i<tc/2-2;i++){
      muro.push({x:i,y:0});
      muro.push({x:i,y:tc-1});
      muro.push({x:tc-1-i,y:0});
      muro.push({x:tc-1-i,y:tc-1});
    }
    for(var i=1;i<tc/2-2;i++){
      muro.push({x:0,y:i});
      muro.push({x:tc-1,y:i});
      muro.push({y:tc-1-i,x:0});
      muro.push({y:tc-1-i,x:tc-1});

    }
},
  function (){
    muro=[];
    for(var i=0;i<tc/2-2;i++){
      muro.push({x:i,y:0});
      muro.push({x:i,y:tc-1});
      muro.push({x:tc-1-i,y:0});
      muro.push({x:tc-1-i,y:tc-1});
    }
    for(var i=1;i<tc-1;i++){
      muro.push({x:0,y:i});
      muro.push({x:tc-1,y:i});
    }
},
  function (){
    muro=[];
    for(var i=0;i<tc;i++){
      muro.push({x:i,y:0});
      muro.push({x:i,y:tc-1});
    }
    for(var i=1;i<tc-1;i++){
      muro.push({x:0,y:i});
      muro.push({x:tc-1,y:i});
    }
},
  function (){
    muro=[];
    for(var i=0;i<tc;i++){
      muro.push({x:i,y:8});
    }
},
  function (){
    muro=[];
    for(var i=0;i<tc;i++){
      muro.push({x:i,y:8});
    }
    for(var i=0;i<tc;i++){
      muro.push({x:8,y:i});
    }
  }
];

muri = [null, muro1, muro2, muro3, muro4, muro5, muro6];

function collisione(x, y, rettangoli) {
  for (var i=0;i<rettangoli.length;i++) {
      if(rettangoli[i].x==x && rettangoli[i].y==y) {
          return true;
      }
  }
  return false;
}

function game() {
  update();
  draw();
}

function nuovamela(){
  while (true){
    ax=Math.floor(Math.random()*tc);
    ay=Math.floor(Math.random()*tc);
    if (! (collisione(ax, ay, muro) || collisione(ax, ay, snake))) {
      return;
    }
  }
}

function update() {
  switch(key_pressed) {
      case "ArrowLeft":
          xv=-1;yv=0;
          break;
      case "ArrowUp":
          xv=0;yv=-1;
          break;
      case "ArrowRight":
          xv=1;yv=0;
          break;
      case "ArrowDown":
          xv=0;yv=1;
          break;
    }
    key_pressed = null;


    px += xv;   /* px = px + xv */
    py += yv;
    if (px<0) {
        px = tc-1;
    }
    if(px>tc-1) {
        px= 0;
    }
    if(py<0) {
        py= tc-1;
    }
    if(py>tc-1) {
        py= 0;
    }

    while(snake.length > lunghezza-1) {
      snake.shift();
    }

    if (collisione(px, py, snake)) {
        reset();
    }

    snake.push({x:px,y:py});

    if (collisione(px, py, muro)){
      reset();
    }

    if(ax==px && ay==py) {
        lunghezza+= 5;
        nuovamela();
    }
    if (lunghezza>=50) {
      reset();
      livello++;

      if (livello < muri.length) {
        muri[livello]();
      } else {
        /* fine livelli */
      }

      nuovamela();
    }
}

function draw() {
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height);

    ctx.fillStyle="aqua";
    for(var i=0;i<muro.length;i++) {
        ctx.fillRect(muro[i].x*gs,muro[i].y*gs,gs-2,gs-2);
    }


    ctx.fillStyle="lime";
    for(var i=0;i<snake.length;i++) {
        ctx.fillRect(snake[i].x*gs,snake[i].y*gs,gs-2,gs-2);
    }

    ctx.fillStyle="red";
    ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
}

function keyPush(evt) {
    key_pressed = evt.code;
}

function reset() {
   snake=[];
   lunghezza = 5;
   px=py=10;
   xv=1;
   yv=0;
}
