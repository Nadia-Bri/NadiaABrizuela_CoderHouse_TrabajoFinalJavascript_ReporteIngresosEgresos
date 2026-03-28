let registroEditando = null;

function obtenerDatos(){
    return JSON.parse(localStorage.getItem("registrosMovimiento")) || {};
}

function guardarDatos(datos){
    localStorage.setItem("registrosMovimiento", JSON.stringify(datos));
}

function buscarPorFecha(fecha){
    return Object.values(obtenerDatos())
                .filter(reg => reg.fecha === fecha);
}

function renderResultados(registros){
    const container = document.getElementById("listaRegistrosCargados");
    container.innerHTML = "";
    if(registros.length === 0){
        container.innerHTML = "<li>No se encontraron registros para esa fecha</li>";
        return;
    }
    registros.forEach(registro => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${registro.tipoDeRegistro}</strong> |
            ${registro.fecha} |
            $ ${registro.monto} |
            ${registro.detalle}

            <button class="editar" onclick="editarMovimiento('${registro.id}')">
                Editar
            </button>

            <button class="eliminar" onclick="eliminarMovimiento('${registro.id}')">
                Eliminar
            </button>
        `;
        container.appendChild(li);
    });
}

document.getElementById("buscarPorFecha").addEventListener("submit", function(event){
    event.preventDefault();
    const fecha = document.getElementById("ingresosDate").value;
    renderResultados(buscarPorFecha(fecha));
});

function editarMovimiento(id){
    const datos = obtenerDatos();
    const registros = Object.values(datos);
    const registro = registros.find(r => r.id == id);
    if(!registro) return;
    registroEditando = { id };
    document.getElementById("nuevoMonto").value = registro.monto;
    document.getElementById("infoRegistro").textContent =
        `${registro.tipoDeRegistro} | ${registro.fecha} | ${registro.detalle}`;
    document.getElementById("formEditarRegistro").style.display = "block";
}

function eliminarMovimiento(id){
    Swal.fire({
        title: "¿Desea Eliminar el Registro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar"
    }).then((result) => {
        if(result.isConfirmed){
            const datos = obtenerDatos();
            delete datos[id];
            guardarDatos(datos);
            Swal.fire("Eliminado", "El registro fue eliminado con éxito", "success");
            // renderizo nuevamente la lista
            const fecha = document.getElementById("ingresosDate").value;
            const resultados = buscarPorFecha(fecha);
            renderResultados(resultados);
        }
    });
    return;
}

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
    if (nuevoMonto < 0) {
        Swal.fire({
            title: "Error",
            text: "Debe ingresar un valor positivo",
            icon: "error"
        });
        return;
    }
    const datos = obtenerDatos();
    const registros = Object.values(datos);
    const registro = registros.find(r => r.id == registroEditando.id);
    if(registro){
        registro.monto = nuevoMonto;
    }
    guardarDatos(datos);

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

function verListadoTotalIngresosEgresos(){
    const container = document.getElementById("listaRegistros");
    container.innerHTML = "";
    const datos = obtenerDatos();
    renderIngresosEgresos(datos);
}

function renderIngresosEgresos(registros) {

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


//llamo a la función que se encuentra armada en resultado.js y volver a listar los ingresos y egresos actualizados
document.getElementById('verListadoTotalIngresosEgresos').addEventListener('click', () => {
    verListadoTotalIngresosEgresos();
});

// lo uso para poder regargar la pagina y volver a modificar algun monto en caso de ser necesario.
document.getElementById("refrescarPagina").addEventListener("click", () => {
    location.reload();
});