let totalIngresos = 0
let totalEgresos = 0
let saldoTotal = 0

function generarResultados(){
    const datosGuardados = JSON.parse(localStorage.getItem("registrosMovimiento")) || {};

    const totalI = Object.values(datosGuardados).reduce((acc, mov) => {
        return (mov.tipoDeRegistro === "Ingreso" || mov.tipoDeRegistro === "IngresoExtra") ? acc + Number(mov.monto) : acc;
    }, 0); // investigando encontre dentro de las buenas practicas en javascript que se puede usar el if en una linea para mejorar su uso en una accion pequeña

    let resultadoI = document.getElementById("resultadoIngreso");
    resultadoI.textContent = totalI;
    totalIngresos = totalI; //Asigno el valor a la variable globla para luego usarlo en el ultimo resultado.

    const totalEg = Object.values(datosGuardados).reduce((acc, mov) => {
        return (mov.tipoDeRegistro === "Egreso" || mov.tipoDeRegistro === "EgresoExtra") ? acc + Number(mov.monto) : acc;
    }, 0);

    let resultadoE = document.getElementById("resultadoEgreso");
    resultadoE.textContent = totalEg;
    totalEgresos = totalEg; //Asigno el valor a la variable globla para luego usarlo en el ultimo resultado.
}

document.getElementById('generarResultadosTotalAhorrado').addEventListener('click', () => {
    //Acá uso ambos valores acumulados.
    generarResultados()
    const totalGeneral = totalIngresos - totalEgresos
    let resultado = document.getElementById("resultadoTotal");
    resultado.textContent = totalGeneral;
    saldoTotal = totalGeneral;
});

function renderMovimiento(registros) {

    const container = document.getElementById("listaRegistros");
    // Convierto los objetos en array
    const arrayRegistros = Object.values(registros);

    arrayRegistros.forEach(registro => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${registro.tipoDeRegistro}</strong> |
            ${registro.fecha} |
            $ ${registro.monto} |
            ${registro.detalle}
        `;
        li.classList.add("item-registro");
        container.appendChild(li);
    });
}

// lo pase a función para poder reutilizarlo desde actualizar saldos y volver a mostrar la lista.
function verListadoTotalIngresosEgresos(){
    const container = document.getElementById("listaRegistros");
    container.innerHTML = "";
    const datos = JSON.parse(localStorage.getItem("registrosMovimiento")) || {};
    renderMovimiento(datos);
}

document.getElementById('verListadoTotalIngresosEgresos').addEventListener('click', () => {
    verListadoTotalIngresosEgresos();
});
