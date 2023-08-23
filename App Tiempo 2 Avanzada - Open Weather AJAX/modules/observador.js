export class Observador extends IntersectionObserver{
    constructor()
    {
        super(  
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.style.opacity = 1;
                  entry.target.style.transform = "scale(1)";
                  document.body.style.backgroundColor  = entry.target.getAttribute("data-color");
                } else {
                  entry.target.style.opacity = 0;
                  entry.target.style.transform = "scale(.65)";
                }
              });
            },
            {
              threshold: 0.45,
              rootMargin: "20px"
            }
          );
    }

    observa(elementos){
        elementos.forEach((elemento) => {
            super.observe(elemento);
          });
    }
    
    observe(){}
}