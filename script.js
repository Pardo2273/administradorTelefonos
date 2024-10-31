//funcion que muestra todos los registros de la API
async function mostrarRegistros(){
    await fetch('https://my-json-server.typicode.com/fedegaray/telefonos/db', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(respuesta => respuesta.json())
    .then(data => {
        //console.log(data.dispositivos);
        let tabla = document.getElementById('miTabla');
        for(let item of data.dispositivos){
            //console.log(item);
            //let salida = item.id + item.marca + item.modelo + item.color + item.almacenamiento + item.procesador;
            //console.log(salida);

            let filaTabla = document.createElement('tr');
            let celda1 = document.createElement('td');
            celda1.innerText = item.id;
            let celda2 = document.createElement('td');
            celda2.innerText = item.marca;
            let celda3 = document.createElement('td');
            celda3.innerText = item.modelo;
            let celda4 = document.createElement('td');
            celda4.innerText = item.color;
            let celda5 = document.createElement('td');
            celda5.innerText = item.almacenamiento;
            let celda6 = document.createElement('td');
            celda6.innerText = item.procesador;

            filaTabla.appendChild(celda1);
            filaTabla.appendChild(celda2);
            filaTabla.appendChild(celda3);
            filaTabla.appendChild(celda4);
            filaTabla.appendChild(celda5);
            filaTabla.appendChild(celda6);

            tabla.appendChild(filaTabla);
        }
    })
    .catch(error => console.log(error));
}

//funcion que se encarga de solo consultar un elemento del api
async function mostrarUnSoloRegistro() {
    let entradaUsuario = document.getElementById('numeroInput');
    let identificador = parseInt(entradaUsuario.value)

    await fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + identificador,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(respuesta => respuesta.json())
    .then(data => {
        //console.log(data) //para prueba
        document.getElementById('id').textContent = "Id: " + data.id;
        document.getElementById('marca').textContent = "Marca: " + data.marca;
        document.getElementById('modelo').textContent = "Modelo: " + data.modelo;
        document.getElementById('color').textContent = "Color: " + data.color;
        document.getElementById('almacenamiento').textContent = "Almacenamiento: " + data.almacenamiento;
        document.getElementById('procesador').textContent = "Procesador: " + data.procesador;
    })
    .catch(error => console.log(error));
}

//funcion para agregar dispositivos
async function agregarRegistro() {
    let id = document.getElementById('identificadorTel');
    let marca = document.getElementById('marcaTel');
    let modelo = document.getElementById('modeloTel');
    let color = document.getElementById('colorTel');
    let almacenamiento = document.getElementById('almacenamientoTel');
    let procesador = document.getElementById('procesadorTel');

    await fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id.value,
            marca: marca.value,
            modelo: modelo.value,
            color: color.value,
            almacenamiento: almacenamiento.value,
            procesador: procesador.value
        })
    })
    .then(res => res.json())
    .then(data => {
        //console.log(data);

        let elementoRespuesta = document.getElementById('respuesta');

        let mensaje = "Usted ha registrado el telefono exitosamente, los elementos que agrego son: "+ "\n" +
        "ID: " + data.id + "\n" +
        "Marca: " + data.marca + "\n" +
        "Modelo: " + data.modelo + "\n" +
        "Color: " + data.color + "\n" +
        "Almacenamiento: " + data.almacenamiento + "\n" +
        "Procesador: " + data.procesador;

        let elementoParrafo = document.createElement('p');
        elementoParrafo.innerText = mensaje;

        elementoRespuesta.appendChild(elementoParrafo);
    })
    .catch(error => console.log(error));
}

//funcion para modificar un registro
//primero busco el elemento
async function buscarElemento() {
    let entrada = document.getElementById('inpBusqueda');
    let valorEntrada = parseInt(entrada.value);

    await fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + valorEntrada, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        //console.log(datos.id + datos.marca)
        document.getElementById('identTelefono').innerText = parseInt(datos.id);
        document.getElementById('marcaTelefono').textContent = datos.marca;
        document.getElementById('modeloTelefono').textContent = datos.modelo;
        document.getElementById('colorTelefono').textContent = datos.color;
        document.getElementById('almaTelefono').textContent = datos.almacenamiento;
        document.getElementById('procTelefono').textContent = datos.procesador;
    })   
}

//segundo realizo la funcion que modificara los elementos que consulte
async function modificarRegistro() {
    let registroAModificar = document.getElementById('inpBusqueda');
    let id = parseInt(registroAModificar.value);

    let identificador = document.getElementById('identTelefono');
    let marca = document.getElementById('marcaTelefono');
    let modelo = document.getElementById('modeloTelefono');
    let color = document.getElementById('colorTelefono');
    let almacenamiento = document.getElementById('almaTelefono');
    let procesador = document.getElementById('procTelefono');

    await fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + id, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: identificador.value,
            marca: marca.value,
            modelo: modelo.value,
            color: color.value,
            almacenamiento: almacenamiento.value,
            procesador: procesador.value
        })
    })
    .then(res => res.json())
    .then(data => {
        let elementoRespuesta = document.getElementById('respuestaModificacion');
        let mensaje = "Elemento modificado exitosamente, el registro modificado es:  " + "\n" +
        "ID: " + data.id + "\n" +
        "Marca: " + data.marca + "\n" +
        "Modelo: " + data.modelo + "\n" +
        "Color: " + data.color + "\n" +
        "Almacenamiento: " + data.almacenamiento + "\n" +
        "Procesador: " + data.procesador;

        let elementoParrafo = document.createElement('p');
        elementoParrafo.innerText = mensaje;

        elementoRespuesta.appendChild(elementoParrafo);
    })
    .catch(error => console.log(error));
}


//funcion para eliminar
async function eliminarRegistro() {
    let entrada = document.getElementById('idEliminar');
    let id = parseInt(entrada.value);

    await fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        
        let respuesta = document.getElementById('respuestaEliminar');

        let mensaje = "El registro se ha eliminado exitosamente";

        let elementoParrafo = document.createElement('p');
        elementoParrafo.innerText = mensaje;

        respuesta.append(elementoParrafo);
    })
    .catch(error => console.log(error));
}