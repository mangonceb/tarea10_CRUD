/*
He creado dos tipos de variables, una global del tipo arrNombre y otra dentro de la funcion cargarXML() de tipo aNombre.

aNombre carga los elementos del XML por el TagName, pero no es exactamente un array, es un HTMLCollection.

Al añadir registros nuevos a este HTMLCollection me daba error y no he encontrado solución para añadir más registros así que,
opté por transformar estos aNombre en Arrays de verdad para poder hacer correctamente la función de añadir registros.

*/
//Variables con arrays vacios
var arrIndice = new Array();
var arrNombre = new Array();
var arrTelefono = new Array();
var arrLatitud = new Array();
var arrLongitud = new Array();
//Variables del documento HTML
var iIndice = document.getElementById("iIndice");
var iNombre = document.getElementById("Nombre");
var iTelefono = document.getElementById("Telefono");
var iLatitud = document.getElementById("Latitud");
var iLongitud = document.getElementById("Longitud");
var posicion = 0;
//Variables de botones
var botonS = document.getElementById("bSiguiente")
var botonA = document.getElementById("bAnterior")
var botonM = document.getElementById("bModificar");
var botonB = document.getElementById("bBorrar")
var botonG = document.getElementById("bGrabar")
var botonT = document.getElementById("bTabla")
//Eventos de botones
botonS.addEventListener("click", siguiente, false);
botonA.addEventListener("click", anterior, false);
botonM.addEventListener("click", modificarRegistro, false);
botonB.addEventListener("click", borrarRegistro, false);
botonG.addEventListener("click", grabarRegistro, false);
botonT.addEventListener("click", imprimir, false);

function cargarXML() {

    /*En esta funcion leemos los datos del fichero datos.js 
    en formato xml y los transformamos en una coleccion de arrays*/
    var codigo = new DOMParser();
    var myXML = codigo.parseFromString(datosFichero, "text/xml");
    var aNombre = myXML.getElementsByTagName("nombre");
    var aTelefono = myXML.getElementsByTagName("telefono");
    var aLatitud = myXML.getElementsByTagName("latitud");
    var aLongitud = myXML.getElementsByTagName("longitud");

    /*Con este bucle for, recorremos originalmente el HTMLCollection 
    y añadimos su contenido a los Arrays que vamos a manipular*/
    for (var i = 0; i < aNombre.length; i++) {

        //Con este (i+1) hacemos que el índice sea escalable hasta que llegue al último registro
        arrIndice.push(i + 1)

        arrNombre.push(aNombre[i].firstChild.data)
        arrTelefono.push(aTelefono[i].firstChild.data)
        arrLatitud.push(aLatitud[i].firstChild.data)
        arrLongitud.push(aLongitud[i].firstChild.data)
    }
    mostrarRegistro();

}

//Añade al final del array un nuevo índice con los datos que nos muestra el HTML
function grabarRegistro() {
    
    //Este arrIndice.length+1 hace que se sume 1 al último índice que existía para el nuevo registro
    arrIndice.push(arrIndice.length + 1);

    arrNombre.push(iNombre.value);
    arrTelefono.push(iTelefono.value);
    arrLatitud.push(iLatitud.value);
    arrLongitud.push(iLongitud.value);
    imprimir();
}

//Recoge los datos del array en la posición y los muestra en el HTML
function mostrarRegistro() {
    iIndice.value = arrIndice[posicion];
    iNombre.value = arrNombre[posicion];
    iTelefono.value = arrTelefono[posicion];
    iLatitud.value = arrLatitud[posicion];
    iLongitud.value = arrLongitud[posicion];
}

//En la posición en la que se encuentre el array, recoge los datos del HTML
function modificarRegistro() {
    arrNombre[posicion] = iNombre.value;
    arrTelefono[posicion] = iTelefono.value;
    arrLatitud[posicion] = iLatitud.value;
    arrLongitud[posicion] = iLongitud.value;
    mostrarRegistro();
    imprimir();
}

//Borramos en la posición en la que estemos ese mismo registro por el 1
function borrarRegistro() {

    //Detectar si estamos en el último registro antes de borrar
    var esUltimo = false;
    if (posicion == arrIndice.length - 1) {
        esUltimo = true;
    }

    arrIndice.splice(posicion, 1);
    //Una vez borrado, reordena los índices a través de un for para que siga siendo una serie de 1 en 1
    for (let index = 0; index < arrIndice.length; index++) {
        arrIndice[index] = (index + 1);

    }
    arrLongitud.splice(posicion, 1);
    arrTelefono.splice(posicion, 1);
    arrLatitud.splice(posicion, 1);
    arrNombre.splice(posicion, 1);

    //Si se ha borrado el último registro, que muestre el siguiente, es decir, el primero.
    if (esUltimo) {
        siguiente();
    } else {
        mostrarRegistro();
    }
    imprimir();
}

//Recorre hacia delante el array y después del último indice vuelve al primero
function siguiente() {
    if (posicion < arrIndice.length - 1) {
        posicion++;
    } else {
        posicion = 0;
    }
    mostrarRegistro();
}

//Recorre hacia atrás el array y antes del primer indice vuelve al último
function anterior() {
    if (posicion > 0) {
        posicion--;
    } else {
        posicion = arrIndice.length - 1;
    }
    mostrarRegistro();
}

//Cargar el xml y parsearlo
cargarXML();

//Función para imprimir la tabla
function imprimir() {
    //Borramos la tabla anterior (Para imprimir una nueva tabla con los registros actualizados)
    document.getElementById("cuerpo").innerHTML = "";
    //Vamos añadiendo al tbody (id="cuerpo") uno por uno los registros en cada posición del array
    for (c = 0; c <= arrNombre.length - 1; c++) {
        document.getElementById("cuerpo").innerHTML = document.getElementById("cuerpo").innerHTML + ("<tr><td>" + arrIndice[c] + "</td><td>" + arrNombre[c] + "</td><td>" + arrTelefono[c] + "</td><td>" + arrLatitud[c] + "</td><td>" + arrLongitud[c] + "</td></tr>");
    }
}