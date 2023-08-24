// PARA AUDIO ----------------------------------
const audio = document.querySelector("#audio");
const playPauseAudio = document.querySelector("#playPauseAudio");
const restablecerAudio = document.querySelector("#restoreAudio");
const sonido = document.querySelector("#sonido");
const velocidadAudio = document.querySelector("#velocidadAudio");
const restablecerVelocidadAudio = document.querySelector("#restablecerVelocidadAudio");
const masTiempoAudio = document.querySelector("#masTiempoAudio");
const menosTiempoAudio = document.querySelector("#menosTiempoAudio");
const progreso_aud = document.querySelector("#progreso_aud");
const fondo_progreso_aud = document.querySelector("#fondo_progreso_aud");

// playPauseAudio.addEventListener("click", pauseAudio);
playPauseAudio.addEventListener("click", presionar_aud);
restablecerAudio.addEventListener("click", desdeCeroAudio);
sonido.addEventListener("click", mutedUnmutedAudio);
velocidadAudio.addEventListener("change", setVelocidadAudio);
restablecerVelocidadAudio.addEventListener("click", restablecerVelocidadAud);
masTiempoAudio.addEventListener("click", mas5segAud);
menosTiempoAudio.addEventListener("click", menos5SegAud);
fondo_progreso_aud.addEventListener('click', mover_aud);



// Poner a 0 audio, es el reset
function desdeCeroAudio() {
    audio.currentTime = 0;
    audio.pause();
}
// Quita o pone el sonido
function mutedUnmutedAudio() {
    if (audio.muted) {
        audio.muted = false;
    } else {
        audio.muted = true;
    }
}
// En funcion del valor que llegue, se establece esa velocidad de reprodución
function setVelocidadAudio() {
    audio.playbackRate = velocidadAudio.value;
}
// Para restablecer la velocidad
function restablecerVelocidadAud() {
    audio.playbackRate = 1;
    velocidadAudio.value = 1;
}
// Pasa 5 segundos
function mas5segAud() {
    audio.currentTime = audio.currentTime + 5;
}
// Vuelve 5 segundos
function menos5SegAud() {
    audio.currentTime = audio.currentTime - 5;
}
// Pausar o renaudar
let maximo_aud = 400;
function presionar_aud() {
    if (!audio.paused && !audio.ended) {
        audio.pause();
        window.clearInterval(bucle_aud);
    } else {
        audio.play();
        bucle_aud = setInterval(estado_aud, 1);
    }
}
// Movimiento de la barra automático
function estado_aud() {
    if (!audio.ended) {
        var total = parseInt(audio.currentTime * maximo_aud / audio.duration);
        progreso_aud.style.width = total + 'px';
    } else {
        progreso_aud.style.width = '0px';
        window.clearInterval(bucle_aud);
    }
}
// Nosotros movemos la barra
function mover_aud(e) {
    if (!audio.paused && !audio.ended) {
        var ratonX = e.pageX - progreso_aud.offsetLeft;
        var nuevoTiempo = ratonX * audio.duration / maximo_aud;
        audio.currentTime = nuevoTiempo;
        progreso_aud.style.width = ratonX + 'px';
    }
}
// PARA VIDEO ----------------------------------
const video = document.querySelector("#video");
const botonPlayPause = document.querySelector("#playPause");
const botonRestablecer = document.querySelector("#restore");
const botonAudio = document.querySelector("#video_audio");
const velocidadVideo = document.querySelector("#velocidadVideo");
const restablecerVelocidadVideo = document.querySelector("#restablecerVelocidadVideo");
const masTiempo = document.querySelector("#masTiempo");
const menosTiempo = document.querySelector("#menosTiempo");
const progreso = document.querySelector("#progreso");
const fondo_progreso = document.querySelector("#fondo_progreso");

// botonPlayPause.addEventListener("click", playPause);
botonPlayPause.addEventListener("click", presionar);
botonRestablecer.addEventListener("click", desdeCero);
botonAudio.addEventListener("click", mutedUnmuted);
velocidadVideo.addEventListener("change", setVelocidadVideo);
restablecerVelocidadVideo.addEventListener("click", restablecerVelocidadVid);
masTiempo.addEventListener("click", mas5seg);
menosTiempo.addEventListener("click", menos5Seg);
fondo_progreso.addEventListener('click', mover);
video.muted = true;


// Pone a 0 la reproducción
function desdeCero() {
    video.currentTime = 0;
    video.pause();
}
// Pone o quita el sonido
function mutedUnmuted() {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
}
// Recogemos valor para establecer la nueva velocidad
function setVelocidadVideo() {
    video.playbackRate = velocidadVideo.value;
}
// Pone la velocidad al nivel normal
function restablecerVelocidadVid() {
    video.playbackRate = 1;
    velocidadVideo.value = 1;
}
// Pasa la reproducción 5 segundos
function mas5seg() {
    video.currentTime = video.currentTime + 5;
}
// Vuelve la reproducción 5 segundos
function menos5Seg() {
    video.currentTime = video.currentTime - 5;
}
// Pausar o renaudar el video
let maximo = 400;
function presionar() {
    if (!video.paused && !video.ended) {
        video.pause();
        window.clearInterval(bucle);
    } else {
        video.play();
        bucle = setInterval(estado, 1);
    }
}
// Pintamos la barra automáticamente
function estado() {
    if (!video.ended) {
        var total = parseInt(video.currentTime * maximo / video.duration);
        progreso.style.width = total + 'px';
    } else {
        progreso.style.width = '0px';
        window.clearInterval(bucle);
    }
}
// Clicamos en la barra para reproducir otro tiempo
function mover(e) {
    if (!video.paused && !video.ended) {
        var ratonX = e.pageX - progreso.offsetLeft;
        var nuevoTiempo = ratonX * video.duration / maximo;
        video.currentTime = nuevoTiempo;
        progreso.style.width = ratonX + 'px';
    }
}
