// Prueba
// const ciudad = document.querySelector("#ciudad");
// ciudad.addEventListener("input", comprobar);
// ciudad.addEventListener("blur", comprobar);

// Compruebo si los valores recibidos en el formulario coinciden
function comprobar() {
    let ciudades = document.getElementById('ciudades').value;

    if (ciudades == 'Salamanca' || ciudades == 'Ávila' || ciudades == 'León' || ciudades == 'Zamora') {
        document.getElementById('ciudades').style.backgroundColor = "blue";
    } else {
        document.getElementById('ciudades').style.backgroundColor = "red";
    }
}