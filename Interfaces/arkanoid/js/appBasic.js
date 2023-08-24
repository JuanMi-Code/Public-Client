var WIDTH = 500;
var HEIGHT = 500;
var x = WIDTH/2;
var y = HEIGHT-10;
var paddlex = WIDTH/2;
var paddledx = WIDTH/75;
var paddlewidth = WIDTH/4;
var dx = 1;
var dy = -4;
var intervalID = 0;
var canvas, ctx;
var rightDown = false;
var leftDown = false;
var mouser = "deleteme";
var windowMinX = 0;
var windowMaxX = 0;
var NROWS = 15;
var NCOLS = 8;
var BRICKWIDTH = (WIDTH/NCOLS) - 1;
var BRICKHEIGHT = 15;
var PADDING = 1;
var bricks;

// PARA LAS VIDAS -------------------------------------
const ubicacionVidas = document.querySelector('#imgVidas');
const vidas = document.querySelector("#vidas");
let vidaMenos=false;
// -------------------------------------
// PARA LOS PUNTOS
const puntuacion = document.querySelector("#puntuacion");
// -------------------------------------
// PARA EL DISPARO
const valor = document.querySelector("#contDisparo");
let tiempoD;

// let disparo=3; // Cantidad de disparos
let disparo;

let dispdx = 0;
let dispdy = -2;
let movDisparo;
canvas = document.getElementById("canvas");
// Para el disparo
let disparar;
dispx = WIDTH/2;
dispy = HEIGHT-20;
dispdx=dx;
dispdy=-2;
let rowheightDisp;
let colwidthDisp;



function init() {
    x = WIDTH/2;
    y = HEIGHT-20;
    dx = 1;
    dy = -4;
    paddlex = WIDTH/2;
    ctx = canvas.getContext("2d");
    windowMinX = $("#canvas").offset().left;
    windowMaxX = windowMinX + $("#canvas").width();
    // ------------------------------------- DECIDO SI QUIERO PINTAR DE NUEVO LOS BLOQUES
    if (!vidaMenos) {
        initbricks();
        pintarVidas();
    }else{
        vidaMenos=true;
    }
    draw();
    
}

function initbricks() {
    bricks = new Array(NROWS);
    for (i=0; i < NROWS; i++) {
        bricks[i] = new Array(NCOLS);
        for (j=0; j < NCOLS; j++) {
            // ------------------------------------- GENERO VALOR ALEATORIO EN CELDA
            let alea = getRandomInt(1,5);
            bricks[i][j] = alea;
        }
    }
}

function startdraw() {
    x = WIDTH/2;
    y = HEIGHT-10;
    clearInterval(intervalID);
    // ------------------------------------- VELOCIDAD DEL JUEGO
    intervalID = setInterval(draw, 5);
    // ------------------------------------- RESETEO DE VIDAS
    reseteo();
    // ------------------------------------- CADA VEZ QUE MUERE LE DEVOLVEMOS 10 DISPAROS
    valor.textContent=10;
    disparo = parseInt(valor.textContent);
}

function abort() {
    clearInterval(intervalID);
    vidaMenos=false;
    init();
    // Añado mis datos -------------------------------------
    puntuacion.textContent=0;
    vidas.textContent = 5;
    ubicacionVidas.innerHTML="";
    pintarVidas();
}

function draw() {

    ctx.clearRect(0,0,500,500);

    //draw ball
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x,y,10,0,Math.PI*2,true); 
    ctx.fill();

    px = paddlex - paddlewidth / 2;
    ctx.fillStyle = "red";
    ctx.fillRect(px, HEIGHT-10, paddlewidth, HEIGHT);

    //draw bricks
    for (i=0; i < NROWS; i++) {
        for (j=0; j < NCOLS; j++) {
            //------------------------------------- tengo que pintar los que tienen un valor >= que 1
            pintarXpuntuacion();
        }
    }

    // //------------------------------------- calculamos disparo
    if (disparo>=0&&disparar&&parseInt(valor.textContent)>=0) {
        ctx.fillStyle = 'purple';
        ctx.beginPath();
        ctx.rect(dispx,dispy,5,20);
        ctx.fill();
        dispy += dispdy;
        rowheightDisp = BRICKHEIGHT + PADDING;
        colwidthDisp = BRICKWIDTH + PADDING;
        rowDisp = Math.floor(dispy/rowheightDisp)
        colDisp = Math.floor(dispx/colwidthDisp)
    }

    //update x and y
    x += dx;
    y += dy;

    //have we hit a brick?
    rowheight = BRICKHEIGHT + PADDING;
    colwidth = BRICKWIDTH + PADDING;
    row = Math.floor(y/rowheight)
    col = Math.floor(x/colwidth)
    // tengo que controlar los que tienen un valor >= que 1 -------------------------------------
    controlPuntos();

    //have we hit a wall
    if (x > WIDTH || x < 0) {
        x -= 2*dx;
        dx = -dx;
    }
    //have we hit a paddle
    if (y + 10 > HEIGHT && x > px && x < px + paddlewidth) {
      dx = 8 * ((x-(px+paddlewidth/2))/paddlewidth);
      y -= 2*dy;
      dy = -dy;
    }
    //or the ceiling
    else if (y < 0) {
        y -= 2*dy;
        dy = -dy;
    }
    else if (y > HEIGHT) {
        //TODO: you lose!
        clearInterval(intervalID);
        // CONTROLAMOS LAS VIDAS -------------------------------------
        restarVida();
    }

    if (leftDown)
        paddlex -= paddledx;
    else if (rightDown)
        paddlex += paddledx;
}

function doKeyDown(evt) {
    //right is 39 left is 37
    if (evt.keyCode == 39) {
        rightDown = true;
    }
    else if (evt.keyCode == 37) {
        leftDown = true;
    }
}

function doKeyUp(evt) {
    if (evt.keyCode == 39) {
        rightDown = false;
    }
    else if (evt.keyCode == 37) {
        leftDown = false;
    }
}

function mousemove(evt) {
    minX = evt.pageX - (paddlewidth/2);
    maxX = evt.pageX + (paddlewidth/2);
    if (minX > windowMinX && maxX < windowMaxX) {
        paddlex = evt.pageX - windowMinX;
    }
}

function touchmove(evt) {
    if (evt.touches.length==1) {
        paddlex = evt.touches[0].pageX - windowMinX;
    }
}



// Control para decidir si es o no necesario repintar los bloques y poner a 0 la puntuación y 5 las vidas o no hacerlo
function reseteo() {
    if (parseInt(vidas.textContent)<=0) {
        vidas.textContent = 5;
        puntuacion.textContent=0;
        pintarVidas();
        initbricks();
    }
}
// Contador de vidas
function restarVida() {
    let numVidas = vidas.textContent;
    let resultVidas = parseInt(numVidas) -1;
    vidas.textContent = resultVidas;
    vidaMenos=true;

    let imgVida= document.querySelector(".heart");
    ubicacionVidas.removeChild(imgVida);

    // Si tiene suficientes vidas, que recoloque la bola y la barra y arranque el interval para seguir jugando
    if (resultVidas>=1) {
        init();
        startdraw();
    }
}
function pintarVidas() {
    let corazones = parseInt(vidas.textContent);
    for (let i = 0; i < corazones; i++) {
        let img = document.createElement("img");
        img.src="../arkanoid/img/heart.png";
        img.classList.add("heart");
        ubicacionVidas.appendChild(img);
    }
}
// PUNTUACIÓN FUCIONALIDAD
function getRandomInt(max, min=0) {
    return Math.floor(Math.random() * (max - min) + min);
}
// Cuando choca contra un bloque, le resta 1 al valor que tenía y asigna puntos
function controlPuntos() {

    let puntos=parseInt(puntuacion.textContent);

    if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] >= 1) {
        
        dy = -dy;
        switch (bricks[row][col]) {
            case 1:
                bricks[row][col] -= 1;
                puntos+=30;
                break;
            case 2:
                bricks[row][col] -= 1;
                puntos+=20;
                break;
            case 3:
                bricks[row][col] -= 1;
                puntos+=15;
                break;
            case 4:
                bricks[row][col] -= 1;
                puntos+=10;
                break;
            case 5:
                bricks[row][col] -= 1;
                puntos+=5;
                break;
        }
        puntuacion.textContent=puntos;
    }
    if (dispy < NROWS * rowheightDisp && rowDisp >= 0 && colDisp >= 0 && bricks[rowDisp][colDisp] >= 1) {
        bricks[rowDisp][colDisp] = 0;
        puntos+=30;
        dispdx = 0;
        dispdy = 0;
        disparar=false;
        disparar=false;
    }else if (dispy < 0) {
        dispdx = 0;
        dispdy = 0;
        disparar=false;
    }
}
// En función del número aleatorio, lo pintamos con un color determinado
function pintarXpuntuacion() {
    if (bricks[i][j] >= 1) {
        switch (bricks[i][j]) {
            case 5:
            ctx.fillStyle = "#581845";
            ctx.fillRect((j * (BRICKWIDTH + PADDING)) + PADDING, 
                (i * (BRICKHEIGHT + PADDING)) + PADDING,
                BRICKWIDTH, BRICKHEIGHT);
                break;
            case 4:
            ctx.fillStyle = "#900C3F";
            ctx.fillRect((j * (BRICKWIDTH + PADDING)) + PADDING, 
                (i * (BRICKHEIGHT + PADDING)) + PADDING,
                BRICKWIDTH, BRICKHEIGHT);
                break;
            case 3:
            ctx.fillStyle = "#C70039";
            ctx.fillRect((j * (BRICKWIDTH + PADDING)) + PADDING, 
                (i * (BRICKHEIGHT + PADDING)) + PADDING,
                BRICKWIDTH, BRICKHEIGHT);
                break;
            case 2:
            ctx.fillStyle = "#FF5733";
            ctx.fillRect((j * (BRICKWIDTH + PADDING)) + PADDING, 
                (i * (BRICKHEIGHT + PADDING)) + PADDING,
                BRICKWIDTH, BRICKHEIGHT);
                break;
            case 1:
            ctx.fillStyle = "#FFC300";
            ctx.fillRect((j * (BRICKWIDTH + PADDING)) + PADDING, 
                (i * (BRICKHEIGHT + PADDING)) + PADDING,
                BRICKWIDTH, BRICKHEIGHT);
                break;
        }
    }
}



canvas.addEventListener('click',()=>{
    if (parseInt(valor.textContent)>0) {
        dispx = paddlex;
        dispy = HEIGHT-20;
        disparar=true;
        dispdx = 0;
        dispdy = -2;
        disparo-=1;
        valor.textContent=disparo;
    }
});
window.addEventListener('keydown',doKeyDown,false);
window.addEventListener('keyup',doKeyUp,false);
window.addEventListener('mousemove',mousemove,false);
window.addEventListener('touchmove',touchmove,false);