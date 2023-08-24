$(document).ready(function () {

    // Desplegar / ocultar contenido
    $("#customizar").click(function () {
        $("#customizar_desplegado").slideToggle("fast");
    });

    // Cambiar estilos predefinidos
    $("#estilos").change(function () {
        let valor = $("#estilos").val();
        switch (valor) {
            case "estilo1":
                $("main").css("background-color", "rgb(39, 42, 42)");
                $("#texto_jquery").css("color", "white");
                $("#texto_jquery").css("font-family","bariolregular");
                $("#texto_jquery").css("font-size", "16px");
                break;
            case "estilo2":
                $("main").css("background-color", "lightblue");
                $("#texto_jquery").css("color", "black");
                $("#texto_jquery").css("font-family","AbaloneSmile");
                $("#texto_jquery").css("font-size", "20px");
                break;
            case "estilo3":
                $("main").css("background-color", "orange");
                $("#texto_jquery").css("color", "blue");
                $("#texto_jquery").css("font-family","Creative_Happiness");
                $("#texto_jquery").css("font-size", "25px");
                break;
        }
    });

    // Cambiar tamano letra
    $("#aumentar_letra").click(function () {

        let texto = $("#texto_jquery").css("font-size");
        console.log(texto);

        tamano = texto.split("p");
        tamano = parseInt(tamano[0]);
        tamano += 5;
        $("#texto_jquery").css("font-size", tamano+"px");

    });
    $("#reducir_letra").click(function () {
        
        let texto = $("#texto_jquery").css("font-size");
        console.log(texto);

        tamano = texto.split("p");
        tamano = parseInt(tamano[0]);
        tamano -= 5;
        $("#texto_jquery").css("font-size", tamano+"px");
    });

    // Cambiar color Accesibilidad. background-color y color
    $("#color_simple_off").attr("disabled","disabled");
    let color;
    $("#color_simple_on").click(function () {
        
        color = $("main").css("background-color");
        $("main").css("background-color", "white");
        $("#texto_jquery").css("color", "black");

        $("#color_simple_off").removeAttr("disabled");
        $("#color_simple_on").attr("disabled","disabled");
    });
    $("#color_simple_off").click(function () {

        $("main").css("background-color", color);
        $("#texto_jquery").css("color", "white");

        $("#color_simple_on").removeAttr("disabled");
        $("#color_simple_off").attr("disabled","disabled");

    });

});