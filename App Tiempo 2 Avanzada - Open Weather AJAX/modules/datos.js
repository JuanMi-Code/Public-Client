export function DatosTiempo(nombre=false, image="", color="#ff")
{
    if (typeof DatosTiempo.isInstanced == 'undefined') 
    {
        DatosTiempo.isInstanced=this;
        DatosTiempo.isInstanced.datos=new Map();
    }

    if(!!nombre)
    {
        const objeto={nombre, image, color};
        DatosTiempo.isInstanced.datos.set(nombre,objeto);
    }
    return DatosTiempo.isInstanced;
}



