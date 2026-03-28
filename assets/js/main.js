
const URL= "./assets/db/data.json"


fetch(URL)
    .then(response => response.json())
    .then(data => {
        const selects = document.querySelectorAll(".catalogo-detalle");
        selects.forEach(select => {
            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.nombre;
                option.textContent = item.nombre;
                select.appendChild(option);
            });
        });
    })
    .catch(error => console.error("Error cargando bd.json:", error));


class Ingreso {
    static id = 0
    constructor(tipoDeRegistro, fecha, monto, detalle) {
        this.id = ++Ingreso.id;
        this.tipoDeRegistro = tipoDeRegistro;
        this.fecha = fecha;
        this.monto = monto;
        this.detalle = detalle
    }

}

class Egreso {
    static id = 0
    constructor(tipoDeRegistro, fecha, monto, detalle) {
        this.id = ++Egreso.id;
        this.tipoDeRegistro = tipoDeRegistro;
        this.fecha = fecha;
        this.monto = monto;
        this.detalle = detalle
    }
}


class IngresoExtra {
    static id = 0
    constructor(tipoDeRegistro, fecha, monto, detalle) {
        this.id = ++IngresoExtra.id;
        this.tipoDeRegistro = tipoDeRegistro;
        this.fecha = fecha;
        this.monto = monto;
        this.detalle = detalle
    }
}


class EgresoExtra {
    static id = 0
    constructor(tipoDeRegistro, fecha, monto, detalle) {
        this.id = ++EgresoExtra.id;
        this.tipoDeRegistro = tipoDeRegistro;
        this.fecha = fecha;
        this.monto = monto;
        this.detalle = detalle
    }
}


let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const registrosIngreso = JSON.parse(localStorage.getItem('registrosIngreso')) || {};
const registroEgreso = JSON.parse(localStorage.getItem('registroEgreso')) || {};
const registroIngExtra = JSON.parse(localStorage.getItem('registroIngExtra')) || {};
const registroEgreExtra = JSON.parse(localStorage.getItem('registroEgreExtra')) || {};

function renderCalendar() {
    // 1. Obtener primer día y total días del mes
    // 2. Generar divs para cada día en #calendarDays
    // 3. Añadir listener click a cada día para seleccionar la fecha
}

//  5. Validación del grupo en el que se registrara la operación para luego poder generar los valores.

function cargabase(registro){
    if (registro.tipoDeRegistro == "Ingresodelmes") {
        registrosIngreso[registro.id] = registro
        localStorage.setItem('registrosIngreso', JSON.stringify(registrosIngreso));
    } else if (registro.tipoDeRegistro == "Egresodelmes") {
        registroEgreso[registro.id] = registro
        localStorage.setItem('registroEgreso', JSON.stringify(registroEgreso));
    } else if (registro.tipoDeRegistro == "IngresoExtra"){
        registroIngExtra[registro.id] = registro
        localStorage.setItem('registroIngExtra', JSON.stringify(registroIngExtra));
    } else {
        registroEgreExtra[registro.id] = registro
        localStorage.setItem('registroEgreExtra', JSON.stringify(registroEgreExtra));
    }
}

// 4. al momento de cqargar los valores según tipo de Registro ingreso o exgreso, se construye el objeto segun tipo de operación y se procede a 
// resguardar en el Local Storage para registrar los valores ingresados.

document.getElementById('formIngresos').addEventListener('submit', function(event) {
    event.preventDefault();
    const tipoDeRegistro = "Ingresodelmes";
    const date = document.getElementById('ingresosDate').value;
    if(!date){
        Swal.fire({
            title: "Error",
            text: "Debe seleccionar una fecha valida",
            icon: "error"
        });
        return;
    }
    const monto = document.getElementById('ingresosMonto').value;
    if(!monto){
        Swal.fire({
            title: "Error",
            text: "Debe ingresar un monto (positivo)",
            icon: "error"
        });
        return;
    }
    const detalle = this.querySelector(".catalogo-detalle").value;
    if(!detalle){
        Swal.fire({
            title: "Error",
            text: "Debe seleccionar un tipo de Detalle",
            icon: "error"
        });
        return;
    }
    const ingreso = new Ingreso(tipoDeRegistro, date, monto, detalle)
    cargabase(ingreso)
    Swal.fire({
        title: "¡Guardado!",
        text: "Su ingreso fue guardado satisfactoriamente",
        icon: "success",
        confirmButtonText: "Aceptar"
    });
    // Se limpian los campos del formulario
    this.reset()
});

document.getElementById('formEgresos').addEventListener('submit', function(event) {
    event.preventDefault();
    const tipoDeRegistro = "Egresodelmes";
    const date = document.getElementById('egresosDate').value;
    if(!date){
        Swal.fire({
            title: "Error",
            text: "Debe seleccionar una fecha valida",
            icon: "error"
        });
        return;
    }
    const monto = document.getElementById('egresosMonto').value;
    if(!monto){
        Swal.fire({
            title: "Error",
            text: "Debe ingresar un monto (positivo)",
            icon: "error"
        });
        return;
    }
    const detalle = this.querySelector(".catalogo-detalle").value;
    if(!detalle){
        Swal.fire({
            title: "Error",
            text: "Debe seleccionar un tipo de Detalle",
            icon: "error"
        });
        return;
    }
    const egreso = new Egreso(tipoDeRegistro, date, monto, detalle)
    cargabase(egreso)
    Swal.fire({
        title: "¡Guardado!",
        text: "Su Gasto fue guardado satisfactoriamente",
        icon: "success",
        confirmButtonText: "Aceptar"
    });
    // Se limpian los campos del formulario
    this.reset()
});

document.getElementById('formIngresosExtra').addEventListener('submit', function(event) {
    event.preventDefault();
    const tipoDeRegistro = "IngresoExtra";
    const date = document.getElementById('ingresoExtraDate').value;
    if(!date){
        Swal.fire({
            title: "Error",
            text: "Debe seleccionar una fecha valida",
            icon: "error"
        });
        return;
    }
    const monto = document.getElementById('ingresoExtraMonto').value;
    if(!monto){
        Swal.fire({
            title: "Error",
            text: "Debe ingresar un monto (positivo)",
            icon: "error"
        });
        return;
    }
    const detalle = this.querySelector(".catalogo-detalle").value;
    if(!detalle){
        Swal.fire({
            title: "Error",
            text: "Debe seleccionar un tipo de Detalle",
            icon: "error"
        });
        return;
    }
    const ingresoExtra = new IngresoExtra(tipoDeRegistro, date, monto, detalle)
    cargabase(ingresoExtra)
    Swal.fire({
        title: "¡Guardado!",
        text: "Su Ingreso Extraordinario fue guardado satisfactoriamente",
        icon: "success",
        confirmButtonText: "Aceptar"
    });
    // Se limpian los campos del formulario
    this.reset()
});

document.getElementById('formEgresosExtra').addEventListener('submit', function(event){
    event.preventDefault();
    const tipoDeRegistro = "EgresoExtra";
    const date = document.getElementById('egresoExtraDate').value;
    if(!date){
        Swal.fire({
            title: "Error",
            text: "Debe seleccionar una fecha valida",
            icon: "error"
        });
        return;
    }
    const monto = document.getElementById('egresoExtraMonto').value;
    if(!monto){
        Swal.fire({
            title: "Error",
            text: "Debe ingresar un monto (positivo)",
            icon: "error"
        });
        return;
    }
    const detalle = this.querySelector(".catalogo-detalle").value;
    if(!detalle){
        Swal.fire({
            title: "Error",
            text: "Debe seleccionar un tipo de Detalle",
            icon: "error"
        });
        return;
    }
    const egresoExtra = new EgresoExtra(tipoDeRegistro, date, monto, detalle)
    cargabase(egresoExtra)
    Swal.fire({
        title: "¡Guardado!",
        text: "Su Egreso Extraordinario fue guardado satisfactoriamente",
        icon: "success",
        confirmButtonText: "Aceptar"
    });
    // Se limpian los campos del formulario
    this.reset()
});

renderCalendar();

const miBoton = document.getElementsByClassName('miBoton');
for(const item of miBoton){
    item.addEventListener('click', () => {
        window.location.href = './pages/saldos.html';
    });
}

const botonModificar = document.getElementsByClassName('botonModificar');
for(const item of botonModificar){
    item.addEventListener('click', () => {
        window.location.href = './pages/actualizarSaldos.html';
    });
}

// prueba base
function obtenerRegistros() {
    fetch(URL)
        .then(respose => respose.json())
        .then(data => {
            renderGastos(data)
            console.log(data)
        })
        .catch(err => console.log("Error detectado: ",err))
        .finally(()=> console.log("Peticion finalizada"))
}

function renderProductos(listaGastos) {
    listaGastos.forEach(gasto => {
        const card = document.createElement("div")
        card.innerHTML = `<h2>ID: ${gasto.id}</h2>
                        <h3>Nombre: ${gasto.tipoDeRegistro}</h3>`
        usersContainer.appendChild(card)
    })
}

obtenerRegistros()