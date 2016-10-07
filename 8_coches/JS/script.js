var posicion = 0;
var numero = 1;
var clasificado=0;
var dinero = 500;
var cocheApostado;
var numeroCoche;
var coches = [];
var clasificacion = [];
//FUNCION GENERAR LOS COCHES: 6 COCHES Y  OTRAS COSAS.
function generarCoches(){
  document.getElementById("go").disabled = true;
  //AQUI CONCRETAMENTE CREAMOS H3 PARA EL SALDO DEL JUGADOR IMPRIMIRLO.
  var saldo = document.createElement("h3");
  saldo.id="tituloD";
  document.getElementById("circuito").appendChild(saldo);
  document.getElementById("tituloD").innerHTML = "<strong>Saldo: </strong> " + dinero + "€";
  document.getElementById("tituloD").style.visibility="visible";
  //AQUI HACEMOS VISIBLES E INVISIBLES LOS INPUT, DIV ETC.
  document.getElementById("apuesta").style.visibility="visible";
  document.getElementById("start").style.visibility="hidden";document.getElementById("go").style.visibility="visible";
  document.getElementById("nCoche").style.visibility="visible";document.getElementById("apuesta1").style.visibility="visible";
  document.getElementById("ha").style.visibility="visible";document.getElementById("hb").style.visibility="visible";
  //GENERAMOS LOS 6 COCHES.
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
//GENERAMOS LAS LINEAS DE SALIDAS Y LAS BANDERAS DE SALIDA Y LLEGADA.
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
//ESTO ES PARA LA OPCION DE APUESTA, LA ELECCION DEL JUGADOR DE QUE COCHE VA A APOSTAR.
function cochesEnApuesta() {
    document.getElementById("coches").innerHTML = "";
    for(var i = 1; i <= 6; i++) {
        document.getElementById("coches").innerHTML += "<option value=\"" + i + "\">" + i + "</option>";
    }
}
//AQUI ESTA ABARCA EL APARTADO DE APUESTA.
function apuesta(){
  document.getElementById("go").disabled = false;
  document.getElementById("apuesta").style.visibility="hidden";
  if (dinero >= parseInt(document.getElementById("apuesta1").value)) {
      dinero -= parseInt(document.getElementById("apuesta1").value);
      cocheApostado = "coche" + document.getElementById("coches").value;
  }else if (dinero <= parseInt(document.getElementById("apuesta1").value)) {
      document.getElementById("dinero").innerHTML = "<strong>NO PUEDES APOSTAR MAS QUE TU SALDO:" + dinero
      + "€ Y HAS APOSTADO: " + document.getElementById("apuesta1").value + "€</strong>";
  }else {
      document.getElementById("dinero").innerHTML = "<strong>SALDO: </strong> " + dinero + "€";
  }
}
//HACER INVISIBLES ALGUNOS ELEMENTOS Y CREAR VARIABLE COCHE, AÑADIR ID Y EJECUTAR RESPECTIVAMENTE FUNCION CORRER.
function go(){
  document.getElementById("go").style.visibility="hidden";
  document.getElementById("ha").style.visibility="hidden";document.getElementById("hb").style.visibility="hidden";
  document.getElementById("nCoche").style.visibility="hidden";document.getElementById("apuesta1").style.visibility="hidden";
  for(var i = 1; i <= 6; i++){
      var coche = "coche" + i;
      correr(document.getElementById(coche));
  }
}
//SE MUEVEN LOS COCHES Y ADEMAS AÑADE LAS CLASIFICACION, PERO NO LOS IMPRIME, ESO LO HACE LA FUNCION mostrarClasificacion.
function correr(coche){
  document.getElementById("tituloD").style.visibility="hidden";
  //coche es la variable enviada en la function go() que envia todos los id de coches.
  console.log(coche);
  //creo el intervalo que le dara velocidades aleatorias y desplazamiento hacia la derecha a los coches id de go();
  var salida = [];
  var primero = 0;
  salida[coche.value] = setInterval(function(){
        if (coche.offsetLeft <= 1150) {
            coche.style.left = (coche.offsetLeft + 10) + 'px';
          }else {
              clearInterval(salida[coche.value]);
              clasificacion[clasificado] = coche.id;
              clasificado++;
              primero++;
              //console.log(clasificacion);
              mostrarClasificacion(clasificacion[clasificado - 1]);
              if (clasificado == 1) {
                  resultado();
              }
            }
  },Math.floor((Math.random()*20)+10));
}
//MUESTRA LA CLASIFICACION DE LOS COCHES.
function mostrarClasificacion(i){
  //creo p para despues eliminarlos en reiniciar y volver a crearlos en la opcion de mostrarClasificacion de la partida.
  var clasis = document.createElement("p");
  clasis.id="clasificacion";
  document.getElementById("tabla").appendChild(clasis);
  numeroCoche = document.getElementById("nCoche");
  //console.log(i)
  // si quieres imprimir text en vez de img = document.getElementById("clasificacionP").innerHTML
  document.getElementById("clasificacion").innerHTML += "<h3>" + clasificado + ". <img src=\"" + document.getElementById(i).src
  + "\" class=\"cochecito\"></h3>";
  if (clasificado == 6) {
    document.getElementById("tabla").style.visibility="visible";
    if (dinero == 0) {
      document.getElementById("otra").style.visibility="hidden"
      document.getElementById("reset").style.visibility="visible";
    }else {
      document.getElementById("otra").style.visibility="visible";
      document.getElementById("reset").style.visibility="visible";
    }
  }
}
//MUESTRA EL RESULTADO DE LA APUESTA.
function resultado(){
  if (dinero >= parseInt(document.getElementById("apuesta1").value) || dinero == 0) {
    if (cocheApostado == clasificacion[0] && document.getElementById("apuesta1").value != 0) {
        //Ha ganado la apuesta
        dinero += parseInt(document.getElementById("apuesta1").value) * 2;
        document.getElementById("dinero").innerHTML = "<strong>SALDO: </strong> " + dinero + "€";
    }else if (document.getElementById("apuesta1").value == 0){
        document.getElementById("dinero").innerHTML = "<strong>SALDO: </strong> " + dinero + "€";
      }else if (dinero == 0){
          document.getElementById("dinero").innerHTML = "<strong>TE QUEDASTE SIN DINERO.</strong> ";
        }else {
          document.getElementById("dinero").innerHTML = "<strong>SALDO:</strong> " + dinero + "€";
        }
  }
}
//PARA SEGUIR JUGANDO.
function reiniciar() {
    document.getElementById("otra").style.visibility="hidden";
    document.getElementById("reset").style.visibility="hidden";
    //Borra todos los coches
    for(var i = 1; i <= 6; i++){
        var coche = "coche" + i;
        document.getElementById(coche).parentNode.removeChild(document.getElementById(coche));
        //var coche = document.getElementById(clasificacion[i]);
        //coche.parentNode.removeChild(coche);
    }
    var clas = document.getElementById("clasificacion");
    clas.parentNode.removeChild(clas);
    document.getElementById("tabla").style.visibility="hidden";
    document.getElementById("start").style.visibility="visible";
    clasificacion =[];
    clasificado = 0;
    posicion= 0;
    numero = 1;
}
//RESETEAR LA PARTIDA INCLUYENDO RESETEAR EL DINERO.
function resetear() {
    dinero = 500;
    reiniciar();
}
//GENERA NUMERO ALEATORIOS.
function random(min, max){
  return Math.floor((Math.random()*max)+min);
}
