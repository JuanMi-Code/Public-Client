var c=document.getElementById("canvas");
var ctx=c.getContext("2d");

let imgData;

c.addEventListener("click",ejecutar);
var ANCHO = canvas.width;
var ALTO = canvas.height;
var img = new Image();
img.src = "../media/fondo.png";
img.addEventListener("load", function () {
    ctx.drawImage(img, 0, 0, ANCHO, ALTO);
}, false );

function ejecutar(e) {
    // Recojo cordenadas
    let x = e.pageX - this.offsetLeft;
    let y = e.pageY - this.offsetTop;
    
    console.log(x+" "+y);

    if (x>=100 &&x<=250&&y>=100&&y<=250) {
        console.log("cara1");
        // si clico dentro de un recuadro, (estableciendo las cordenadas en el parentesis), se ejecuta la funcion copiar
        copy(x,y);
    }else if (x>=440 &&x<=650&&y>=50&&y<=250) {
        console.log("cara2");
        copy(x,y);
    }else if (x>=130 &&x<=330&&y>=380&&y<=650){
        console.log("cuerpo1");
        // si clico dentro de un recuadro, (estableciendo las cordenadas en el parentesis), se ejecuta la funcion pegar
        paste(x,y);
    }else if (x>=470 &&x<=600&&y>=380&&y<=625){
        console.log("cuerpo2");
        paste(x,y);
    }
}

// Esta funcion obtiene las coordenadas actuales donde hemos clicado y aumenta el rango en 50 para coger más recuadro 
// y almacena el contenido en "imgData"
function copy(x,y) {
    imgData = ctx.getImageData(x-50, y-50, x+50, y+50);
}
// Esta funcion obtiene las coordenadas actuales donde hemos clicado 
// e intento recuadrar el destino restando 50 para centrar la imagen almacenada en "imgData"
function paste(x,y) {
    ctx.putImageData(imgData,x-50,y-50);
    imgData=null;
}