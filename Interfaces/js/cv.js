let color_experiencia = 0;
let color_formacion = 0;
let color_informatica = 0;

// Cuando clico en cada apartado cambio color del titulo y despligo donde se ha hecho clic
// Si se clica en otro apartado, se recogen los demás y se despliega el seleccionado.

$(document).ready(function () {
    $("#experiencia").click(function () {
        $("#desplegado_experiencia").slideToggle("slow");
       
        if (color_experiencia == 0) {
            $(this).css("background-color", "#FF4301");
            color_experiencia = 1;
        } else {
            $(this).css("background-color", "#FA7D09");
            color_experiencia = 0;
        }

        $("#desplegado_formacion").slideUp("slow");
        $("#formacion").css("background-color", "#FA7D09");
        color_formacion = 0;
        $("#desplegado_informatica").slideUp("slow");
        $("#informatica").css("background-color", "#FA7D09");
        color_informatica = 0;
    });
});

$(document).ready(function () {
    $("#formacion").click(function () {
        $("#desplegado_formacion").slideToggle("slow");
        
        if (color_formacion == 0) {
            $(this).css("background-color", "#FF4301");
            color_formacion = 1;
        } else {
            $(this).css("background-color", "#FA7D09");
            color_formacion = 0;
        }


        $("#desplegado_experiencia").slideUp("slow");
        $("#experiencia").css("background-color", "#FA7D09");
        color_experiencia = 0;
        $("#desplegado_informatica").slideUp("slow");
        $("#informatica").css("background-color", "#FA7D09");
        color_informatica = 0;
    });
});

$(document).ready(function () {
    $("#informatica").click(function () {
        $("#desplegado_informatica").slideToggle("slow");
        
        if (color_informatica == 0) {
            $(this).css("background-color", "#FF4301");
            color_informatica = 1;
        } else {
            $(this).css("background-color", "#FA7D09");
            color_informatica = 0;
        }

        $("#desplegado_experiencia").slideUp("slow");
        $("#experiencia").css("background-color", "#FA7D09");
        color_experiencia = 0;
        $("#desplegado_formacion").slideUp("slow");
        $("#formacion").css("background-color", "#FA7D09");
        color_formacion = 0;
    });
});