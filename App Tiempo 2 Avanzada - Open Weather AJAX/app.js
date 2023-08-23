import { Observador } from "./modules/observador.js";
import { DatosTiempo } from "./modules/datos.js";
import { Ajax } from "./modules/ajax.js";



const enviar = document.querySelector('#enviar');
const ciudad = document.querySelector('#ciudad');
const pais = document.querySelector('#pais');
const main = document.querySelector('main');
const section = main.querySelector('section');



let datos = new DatosTiempo("Clear", "soleado.png", "#f9d104");
datos = new DatosTiempo("Clouds", "nublado.png", "#cee4f2");
datos = new DatosTiempo("Rain", "lluvia.png", "#54c9ee");
datos = new DatosTiempo("Snow", "nieve.png", "#f2f4f5");
datos = new DatosTiempo("Thunderstorm", "tormenta.png", "#f6f5cb");
datos = new DatosTiempo("Drizzle", "niebla.png", "#c0cdd9");
datos = new DatosTiempo("Fog", "niebla.png", "#c0cdd9");
datos = new DatosTiempo("Other", "otro.png", "#3f4b50");
// console.log(datos.datos);
// console.log(datos.datos.get("Clear").color);



function f(z) {

    // console.log(z);
    let imagen;
    let color;

    try {
        // datos.datos.get("hola").color;
        console.log(imagen = datos.datos.get(z.weather[0].main).image);

        imagen = datos.datos.get(`${z.weather[0].main}`).image;
        color = datos.datos.get(`${z.weather[0].main}`).color;

    } catch (e) {
        // console.log(e);
        imagen = datos.datos.get(`Other`).image;
        color = datos.datos.get(`Other`).color;
    }
    // let imagen = datos.datos.get(`${z.weather[0].main}`).image;
    // let color = datos.datos.get(`${z.weather[0].main}`).color;

    let descripcion = z.weather[0].description;
    let temp = z.main.temp;

    // z.name
    // z.sys.country
    pintar(z.name,z.sys.country,imagen,color,descripcion,temp);

}



function ejecutar(e) {
    e.preventDefault();
    
    // console.log(ciudad.value);
    // console.log(pais.value);
    // console.log(section);

    if (ciudad.value!=""&&pais.value!="") {
        
        let consulta=new Ajax(ciudad.value+','+pais.value,f);
        consulta.hacerPeticion();

        section.innerHTML="";
        recarga();

    }else{
        return;
    }
}



function pintar(ciudad,pais,imagen,color,descripcion,temp) {

    let observador = new Observador();

    const div = document.createElement('div');
    div.setAttribute('id',ciudad.value+'-'+pais.value);
    div.setAttribute('data-color',color);
    
    const span = document.createElement('span');
    span.setAttribute('class','cerrar');
    span.textContent='X';
    div.appendChild(span);
    
    const img = document.createElement('img');
    img.src='./img/'+imagen;
    div.appendChild(img);

    const p = document.createElement('p');
        const h2 = document.createElement('h2');
        h2.textContent=ciudad;
        p.appendChild(h2)

        const p1 = document.createElement('p');
        let primera = descripcion.substring(0,1);
        let segunda = descripcion.substring(1);
        p1.textContent=primera.toUpperCase()+segunda.toLowerCase();
        p.appendChild(p1);

        const p2 = document.createElement('p');
        p2.textContent='Temperatura: '+temp+ 'ºC';
        p.appendChild(p2);
    div.appendChild(p);

    section.appendChild(div);


    localStorage.setItem(ciudad.toLowerCase(),pais);

    span.addEventListener('click',borrar);

    observador.observa(section.querySelectorAll('div'));

}



function borrar(e) {
    e.target.parentNode.remove();
    localStorage.removeItem(e.target.parentNode.querySelector('h2').textContent.toLowerCase());
}



function recarga(e) {

    for (let i=0; i<localStorage.length; i++){
        console.log(localStorage.key(i));
        let ciu = localStorage.key(i);
        let pai = localStorage.getItem(localStorage.key(i));

        let consulta=new Ajax(ciu+','+pai,f);
        consulta.hacerPeticion();
    }

}



enviar.addEventListener('click', ejecutar);
window.addEventListener('load',recarga);