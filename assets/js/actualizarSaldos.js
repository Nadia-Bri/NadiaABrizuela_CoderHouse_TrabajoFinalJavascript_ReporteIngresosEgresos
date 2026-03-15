const storages = [
    "registrosIngreso",
    "registroIngExtra",
    "registroEgreso",
    "registroEgreExtra"
];

let registroEditando = null;

function obtenerDatos(storage){
    return JSON.parse(localStorage.getItem(storage)) || {};
}

function guardarDatos(storage, datos){
    localStorage.setItem(storage, JSON.stringify(datos));
}

function buscarPorFecha(fecha){
    return storages
        .map(storage => {
            const datos = obtenerDatos(storage);
            return Object.values(datos)
                .filter(reg => reg.fecha === fecha)
                .map(reg => ({ ...reg, origen: storage }));
        })
        .flat();
}

function renderResultados(registros){
    const container = document.getElementById("listaRegistrosCargados");
    container.innerHTML = "";
    if(registros.length === 0){
        container.innerHTML = "<li>No se encontraron registros</li>";
        return;
    }
    registros.forEach(registro => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${registro.tipoDeRegistro}</strong> |
            ${registro.fecha} |
            $ ${registro.monto} |
            ${registro.detalle}
            <button data-id="${registro.id}" data-storage="${registro.origen}">
                Editar
            </button>
        `;
        container.appendChild(li);
    });
}

document.getElementById("buscarPorFecha").addEventListener("submit", function(event){
    event.preventDefault();
    const fecha = document.getElementById("ingresosDate").value;
    const resultados = buscarPorFecha(fecha);
    renderResultados(resultados);
});

document.getElementById("listaRegistrosCargados").addEventListener("click", function(event){
    if(event.target.tagName !== "BUTTON") return;
    const id = event.target.dataset.id;
    const storage = event.target.dataset.storage;
    const datos = obtenerDatos(storage);
    const registros = Object.values(datos);
    const registro = registros.find(r => r.id == id);
    if(!registro) return;
    registroEditando = { id, storage };
    document.getElementById("nuevoMonto").value = registro.monto;
    document.getElementById("infoRegistro").textContent =
        `${registro.tipoDeRegistro} | ${registro.fecha} | ${registro.detalle}`;
    document.getElementById("formEditarRegistro").style.display = "block";
});

document.getElementById("formEditarRegistro").addEventListener("submit", function(event){
    event.preventDefault(); 
    const nuevoMonto = Number(document.getElementById("nuevoMonto").value);
    if(!nuevoMonto){
        Swal.fire({
            title: "Error",
            text: "Los valores con decimales van con (.) ejem. 10.20",
            icon: "error"
        });
        return;
    }
    const datos = obtenerDatos(registroEditando.storage);
    const registros = Object.values(datos);
    const registro = registros.find(r => r.id == registroEditando.id);
    if(registro){
        registro.monto = nuevoMonto;
    }
    guardarDatos(registroEditando.storage, datos);
    Swal.fire({
        title: "¡Actualizado!",
        html: `Su monto fue actualizado satisfactoriamente.<br>
        <strong>Para volver a cargar un nuevo cambio presiona "Refrescar"</strong>
        `,
        icon: "success"
    });
    document.getElementById("formEditarRegistro").style.display = "none";
    this.reset()
});

//llamo a la función que se encuentra armada en resultado.js y volver a listar los ingresos y egresos actualizados
document.getElementById('verListadoTotalIngresosEgresos').addEventListener('click', () => {
    verListadoTotalIngresosEgresos();
});

// lo uso para poder regargar la pagina y volver a modificar algun monto en caso de ser necesario.
document.getElementById("refrescarPagina").addEventListener("click", () => {
    location.reload();
});