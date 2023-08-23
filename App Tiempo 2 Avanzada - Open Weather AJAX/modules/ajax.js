`
apiKey por defecto "245af25cc4f2b1ded6d80044e37c5596"
`
export class Ajax{

  constructor(ciudad="Salamanca,ES",f=false,apikey='29c5724fed43d9852cfc6ff90d1f4b02'){
    this.ciudad=ciudad;
    this.f=f;
    this.apikey=apikey;
  }

  hacerPeticion(){

    let enlace = `https://api.openweathermap.org/data/2.5/weather?q=${this.ciudad}&appid=${this.apikey}&lang=es&units=metric`;
    fetch(enlace)
    .then(response => response.json())
    .then(z => this.f(z))
    .then(data => console.log(data))
    .catch(error => console.log('Error:', error));
  }

}