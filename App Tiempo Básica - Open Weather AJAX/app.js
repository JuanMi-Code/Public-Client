// const moment = require("./moment/moment");

const formulario = document.querySelector("#formulario");
const ciudad = document.querySelector("#ciudad");
const pais = document.querySelector("#pais");
const buscar = document.querySelector("#buscar");
const contenido = document.querySelector("#contenido");

let tiempoRecibido;
let comprobar;

const peticion = new XMLHttpRequest();
const apiKey="245af25cc4f2b1ded6d80044e37c5596";
const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&lang=es&units=metric`;


function Tiempo(nomCiudad,nomPais,descripcion,temp,tempMax,tempMin,humedad,amanecer,anochecer,icono) {
    this.nomCiudad = nomCiudad;
    this.nomPais = nomPais;
    this.descripcion = descripcion;
    this.temp = temp;
    this.tempMax = tempMax;
    this.tempMin = tempMin;
    this.humedad = humedad;
    this.amanecer = amanecer;
    this.anochecer = anochecer;
    this.icono = icono;
}


buscar.addEventListener("click", ejecutar);
formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
});


(function() {
    ciudad.value = localStorage.getItem("ciudad");
    pais.value = localStorage.getItem("pais");
 })();


function ejecutar(e) {

    if (ciudad.value=="") {
        ciudad.value="salamanca";
    }
    if (pais.value=="") {
        pais.value="españa";
    }
    
    contenido.innerHTML='';
    // localStorage.clear();
    // localStorage.setItem("ciudad",ciudad.value);
    // localStorage.setItem("pais",pais.value);

    if (ciudad.value!=""&&pais.value!="") {
        peticion.onreadystatechange=dibujarTiempo;

        paisCompleto=pais.value.toLowerCase();
        enviarCiudad=ciudad.value.toLowerCase();
        enviarPais = letrasPais[paisCompleto];
        // console.log(enviarPais);
        peticion.open("GET",url+`&q=${enviarCiudad},${enviarPais}`);
        peticion.send();
    }
}

function dibujarTiempo() {
    if (peticion.readyState==4) {
        
        if (peticion.status=="200") {

            localStorage.clear();
            localStorage.setItem("ciudad",ciudad.value);
            localStorage.setItem("pais",pais.value);

            // Actualizamos cada hora
            clearTimeout(comprobar);
            comprobar = setTimeout(()=>{
                ejecutar();
            }, 3600000);

            // console.log(peticion.response);
            // Procesamos respuesta
            // console.log(JSON.parse(peticion.responseText));
            tiempoRecibido=JSON.parse(peticion.responseText);

            // console.log("Ciudad: "+tiempoRecibido.name);
            // console.log("País: "+tiempoRecibido.sys.country);
            // console.log("Descripción: "+tiempoRecibido.weather[0].description);
            // console.log("Temperatura: "+tiempoRecibido.main.temp);
            // console.log("Temperatura Máxima: "+tiempoRecibido.main.temp_max);
            // console.log("Temperatura Mínima: "+tiempoRecibido.main.temp_min);
            // console.log("Humedad: "+tiempoRecibido.main.humidity);
            
            // moment, importar libreria
            // let d = new Date(tiempoRecibido.sys.sunrise*1000);
            // console.log(d.getHours()+":"+d.getMinutes());

            // console.log("Amanecer: "+Date(tiempoRecibido.sys.sunrise*1000));
            // console.log("Atardecer: "+Date(tiempoRecibido.sys.sunset*1000));


            amanec = tiempoRecibido.sys.sunrise*1000;
            anochec= tiempoRecibido.sys.sunset*1000;
            amanec = moment(amanec).format('hh:mm:ss');
            anochec = moment(anochec).format('hh:mm:ss');

            let TiempoCiudad = new Tiempo(tiempoRecibido.name,tiempoRecibido.sys.country,
                                            tiempoRecibido.weather[0].description,tiempoRecibido.main.temp,
                                            tiempoRecibido.main.temp_max,tiempoRecibido.main.temp_min,
                                            tiempoRecibido.main.humidity,amanec,anochec,
                                            tiempoRecibido.weather[0].icon);
            // console.log(TiempoCiudad);

            let div1=document.createElement("div");
            contenido.appendChild(div1);

            img = document.createElement("img");
            img.src='http://openweathermap.org/img/w/'+TiempoCiudad.icono+'.png';
            div1.appendChild(img);


            let div2=document.createElement("div");
            contenido.appendChild(div2);

            let p = document.createElement("p");
            p.textContent=TiempoCiudad.nomCiudad;
            p.classList.add("datosGrandes");
            div2.appendChild(p);
            
            const d = new Date();
            diaLetra = d.getDay();
            dia = d.getDate();
            mes = d.getMonth();
            ano = d.getFullYear();
            p = document.createElement("p");
            p.textContent= diaSemana[diaLetra]+", "+dia+" de "+numMes[mes]+" de "+ano;
            p.classList.add("datosGrandes");
            div2.appendChild(p);

            // p = document.createElement("p");
            // // p.textContent= "País: "+TiempoCiudad.nomPais;
            // p.textContent= "País: "+pais.value.toUpperCase();
            // div2.appendChild(p);

            p = document.createElement("p");
            let aux1 = TiempoCiudad.descripcion.substring(0,1);
            let aux2 = TiempoCiudad.descripcion.substring(1,TiempoCiudad.descripcion.length);
            p.textContent=aux1.toUpperCase()+aux2;
            p.classList.add("datosGrandes");
            div2.appendChild(p);

            p = document.createElement("p");
            p.textContent=TiempoCiudad.temp+" ºC";
            p.classList.add("temperatura");
            div2.appendChild(p);

            p = document.createElement("p");
            p.textContent= "Max: "+TiempoCiudad.tempMax;
            p.classList.add("info");
            div2.appendChild(p);

            p = document.createElement("p");
            p.textContent= "Min: "+TiempoCiudad.tempMin;
            p.classList.add("info");
            div2.appendChild(p);

            p = document.createElement("p");
            p.textContent= "Humedad: "+TiempoCiudad.humedad+"%";
            p.classList.add("info");
            div2.appendChild(p);

            p = document.createElement("p");
            p.textContent= "Salida de Sol: "+TiempoCiudad.amanecer+" a.m";
            p.classList.add("info");
            div2.appendChild(p);

            p = document.createElement("p");
            p.textContent= "Puesta de Sol: "+TiempoCiudad.anochecer+" p.m";
            p.classList.add("info");
            div2.appendChild(p);

            // CUIDADO PORQUE SE ACUMULAN

        }else if (peticion.status=="404") {
            mostrarError();
        }

    }
}

function mostrarError() {
    const error = document.querySelector("#popup");
    error.style.display="block";
    let borrarPopup=setTimeout(()=>{
        error.style.display="none";
    },5000);

    ciudad.value = localStorage.getItem("ciudad");
    pais.value = localStorage.getItem("pais");
}


const diaSemana = {
    0:"Domingo",
    1:"Lunes",
    2:"Martes",
    3:"Miercoles",
    4:"Jueves",
    5:"Veirnes",
    6:"Sábado"
}

const numMes = {
    0:"enero",
    1:"febrero",
    2:"marzo",
    3:"abril",
    4:"mayo",
    5:"junio",
    6:"julio",
    7:"agosto",
    8:"septiembre",
    9:"octubre",
    10:"noviembre",
    11:"diciembre",
}

const letrasPais = {
"áfrica":"af",
"albania":"al",
"arábica":"ar",
"azerbaiyano":"az",
"bulgária":"bg",
"república checa":"cz",
"dinamarca":"da",
"alemania":"de",
"grecia":"el",
"inglaterra":"en",
"persia":"fa",
"finlandia":"fi",
"francia":"fr",
"hebreo":"he",
"hindi":"hi",
"croata":"hr",
"húngaro":"hu",
"indonesio":"id",
"italia":"it",
"japón":"ja",
"corea":"kr",
"letonia":"la",
"lituania":"lt",
"macedonia":"mk",
"noruega":"no",
"holanda":"nl",
"polonia":"pl",
"portugal":"pt",
"brasil":"pt_br",
"rumanía":"ro",
"rusia":"ru",
"suecia":"sv",
"suecia":"se",
"checoslovaquia":"sk",
"eslovenia":"sl",
"español":"sp",
"españa":"es",
"serbia":"sr",
"tailandia":"th",
"turquía":"tr",
"ucrania":"ua",
"ucrania":"uk",
"vietnam":"vi",
"Chino simplificado":"zh_cn",
"Chino tradicional":"zh_tw",
"zulú":"zu"
};