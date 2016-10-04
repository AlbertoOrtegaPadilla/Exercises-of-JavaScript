var posicion = 0;
var numero = 1;
var clasificado=0;
var dinero = 500;
var cocheApostado;
var numeroCoche;
var coches = [];
var clasificacion = [];
function generarCoches(){
  document.getElementById("go").disabled = true;
  //aqui hacemos visibles e invisibles los inpunt, botonoes, etc...
  document.getElementById("apuesta").style.visibility="visible";
  document.getElementById("start").style.visibility="hidden";document.getElementById("go").style.visibility="visible";
  document.getElementById("nCoche").style.visibility="visible";document.getElementById("apuesta1").style.visibility="visible";
  document.getElementById("ha").style.visibility="visible";document.getElementById("hb").style.visibility="visible";
  for (var i=0;i<6;i++){
    var coche = document.createElement("img");//crea variable de la Imagen coche+ numero
    coche.id="coche" + (i + 1);//crea la clase id del coche
    coche.style.left = 50 + "px";//Posicion coche
    coche.style.top = (80 + posicion) + "px";//Posicion coche
    coche.setAttribute("src","IMG/coche" + numero + ".png");//Imagen coche
    document.getElementById("circuito").appendChild(coche);//visualiza coche
    coches[i]=coche;
    posicion = posicion + 80;
    numero ++;
  }
  lineaSalidaMeta();
  cochesEnApuesta();
}
function lineaSalidaMeta() {
  posicion = 0;
  numero = 1;
  for (var i=0;i<2;i++){
    var bandera = document.createElement("img");//crea una imagen
    bandera.className="linea";//crea la clase linea por el absolute y el index-1
    bandera.style.left = (172 + posicion)+ "px";//Posicion bandera
    bandera.style.top = 20 + "px";//Posicion bandera
    bandera.setAttribute("src","IMG/bandera" + numero + ".png");//Imagen bandera
    document.getElementById("circuito").appendChild(bandera);//visualiza bandera
    posicion = 900;
    numero++;
  }
  posicion = 0;
  for (var i=0;i<2;i++){
    var linea = document.createElement("img");//crea una Imagen
    linea.className="linea";//crea la clase linea
    linea.style.left = (200 + posicion)+ "px";//Posicion lineaSa
    linea.style.top = 85 + "px";//Posicion lineaSa
    linea.setAttribute("src","IMG/linea.png");//Imagen lineaSa
    document.getElementById("circuito").appendChild(linea);//visualiza lineaSa
    posicion = 900;
  }
}
//function go() es para los poner invisibles y crear la variable coche = a los coches id.
function go(){
  document.getElementById("go").style.visibility="hidden";
  document.getElementById("ha").style.visibility="hidden";document.getElementById("hb").style.visibility="hidden";
  document.getElementById("nCoche").style.visibility="hidden";document.getElementById("apuesta1").style.visibility="hidden";
  for(var i = 1; i <= 6; i++){
      var coche = "coche" + i;
      correr(document.getElementById(coche));
  }
}
//se mueven los coches
function correr(coche){
  //coche es la variable enviada en la function go() que envia todos los id de coches.
  console.log(coche);
  //creo el intervalo que le dara velocidades aleatorias y desplazamiento hacia la derecha a los coches id de go();
  var salida = [];
  salida[coche.value] = setInterval(function(){
        if (coche.offsetLeft <= 1150) {
            coche.style.left = (coche.offsetLeft + Math.floor(Math.random()*6)) + 'px';
          }else {
              clearInterval(salida[coche.value]);
              clasificacion[clasificado] = coche.id;
              clasificado++;
              console.log(clasificacion);
              mostrarClasificacion(clasificacion[clasificado - 1]);
              var ganado = parseInt(document.getElementById("apuesta1").value) * 2;
              if (cocheApostado == clasificacion[0] && document.getElementById("apuesta1").value != 0) {
                  //Ha ganado la apuesta
                  dinero += ganado;
                  document.getElementById("dinero").innerHTML = "<strong>Dinero Acumulado:</strong> " + dinero + "€";
              }else if (document.getElementById("apuesta1").value == 0){
                  document.getElementById("dinero").innerHTML = "<strong>Dinero Acumulado:</strong> " + dinero + "€";
                }else{
                document.getElementById("dinero").innerHTML = "<strong>Dinero Acumulado:</strong> " + dinero + "€";
              }
            }
  },Math.floor(Math.random()*30));
}
function mostrarClasificacion(i){
  numeroCoche = document.getElementById("nCoche");
  console.log(numeroCoche);
  var c = 0;
  //console.log(i)
  // si quieres imprimir text en vez de img = document.getElementById("clasificacionP").innerHTML
  document.getElementById("clasificacion").innerHTML += "<h3>" + clasificado + ". <img src=\"" + document.getElementById(i).src
  + "\" class=\"cochecito\"></h3>";

  if (clasificado == 6) {
    document.getElementById("tabla").style.visibility="visible";
  }
}
function cochesEnApuesta() {
    document.getElementById("coches").innerHTML = "";
    for(var i = 1; i <= 6; i++) {
        document.getElementById("coches").innerHTML += "<option value=\"" + i + "\">" + i + "</option>";
    }
}
function apuesta(){
  document.getElementById("go").disabled = false;
  document.getElementById("apuesta").style.visibility="hidden";
  if (dinero >= parseInt(document.getElementById("apuesta1").value)) {
      dinero -= parseInt(document.getElementById("apuesta1").value);
      cocheApostado = "coche" + document.getElementById("coches").value;
      console.log(dinero)
  }
}
function random(min, max){
  return Math.floor((Math.random()*max)+min);
}
