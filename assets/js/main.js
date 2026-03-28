const URL = "./assets/db/data.json"

//Realizo el cambio en DOMContentLoaded ya que en el HTML tengo el defer
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

//armo un unico Object ya que todos mantiene los mismos atributos al igual que un unico localStorage
class Movimiento {
    static id = 0

    constructor(tipoDeRegistro, fecha, monto, detalle) {
        this.id = ++Movimiento.id;
        this.tipoDeRegistro = tipoDeRegistro;
        this.fecha = fecha;
        this.monto = monto;
        this.detalle = detalle
    }
}

const registrosMovimiento = JSON.parse(localStorage.getItem('registrosMovimiento')) || {};


function cargabase(registro) {
    registrosMovimiento[registro.id] = registro;
    localStorage.setItem('registrosMovimiento', JSON.stringify(registrosMovimiento));
}

const yearNow = new Date().getFullYear();

function nuevoMovimiento(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target;

    const tipoDeRegistro = form.querySelector('input[name="tipoDeRegistro"]').value;
    const date = form.querySelector('input[name="date"]').value;
    if (!date) {
        Swal.fire({
            title: "Error",
            text: "Debe seleccionar una fecha valida",
            icon: "error"
        });
        return;
    }
    const dateFormat = new Date(date);//valido la fecha para evitar que ingresen una fecha erronea
    if (dateFormat.getFullYear() < yearNow) {
        Swal.fire({
            title: "Error",
            text: `Debe ser del ${yearNow} o posterior`,
            icon: "error"
        });
        return;
    }

    const monto = form.querySelector('input[name="monto"]').value;
    if (!monto) {
        Swal.fire({
            title: "Error",
            text: "Debe ingresar un monto (positivo)",
            icon: "error"
        });
        return;
    }
    if (monto < 0) {//valido el monto para que no se puedan cargar valores negativos
        Swal.fire({
            title: "Error",
            text: "Debe ingresar un valor positivo",
            icon: "error"
        });
        return;
    }

    const detalle = form.querySelector('select[name="catalogo"]').value;
    if (!detalle) {
        Swal.fire({
            title: "Error",
            text: "Debe seleccionar un tipo de Detalle",
            icon: "error"
        });
        return;
    }

    const movimiento = new Movimiento(tipoDeRegistro, date, monto, detalle)
    cargabase(movimiento)

    Swal.fire({
        title: "¡Guardado!",
        text: "Su movimiento fue guardado satisfactoriamente",
        icon: "success",
        confirmButtonText: "Aceptar"
    });
    // Se limpian los campos del formulario
    this.reset()
}

document.querySelectorAll('.form-movimiento').forEach(form => {
    form.addEventListener('submit', nuevoMovimiento);
});

document.getElementById('versaldo').addEventListener('click', () => {
    window.location.href = './pages/saldos.html';
});

document.getElementById('modificar').addEventListener('click', () => {
    window.location.href = './pages/actualizarSaldos.html';
});