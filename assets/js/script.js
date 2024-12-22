const tareas = [
    { id: 0, descripcion: "Sacar a pasear a las palomas.", completada: false },
    { id: 1, descripcion: "Lavar las hojas del árbol.", completada: true },
    { id: 2, descripcion: "Falsificar billetes falsos.", completada: false }
];

const listContainer = document.getElementById('list-container');
const botonAgregar = document.getElementById('boton-ingreso');
const inputDescripcion = document.getElementById('input-descripcion'); 

botonAgregar.addEventListener('click', () => {
    if (inputDescripcion.value.trim() !== '') {
        agregarTarea(inputDescripcion.value);
        inputDescripcion.value = '';
    }
});

const agregarTarea = (descripcionAgregar) => {
    const nuevoID = Date.now() % 1000;
    const nuevaTarea = { id: nuevoID, descripcion: descripcionAgregar, completada: false };
    tareas.push(nuevaTarea);
    agregarTareaALista(nuevaTarea);
};

const eliminarTarea = (idEliminar) => {
    const index = tareas.findIndex(ele => ele.id === idEliminar);
    if (index !== -1) {
        tareas.splice(index, 1);
        const divEliminar = document.getElementById(`item-${idEliminar}`);
        if (divEliminar){
            divEliminar.remove();
            actualizarValores();
        } 
    }
};

const actualizarValores = () => {
    let cantidadRealizada = 0;

    tareas.forEach(element => {
        cantidadRealizada += element.completada ? 1 : 0;
    });

    document.getElementById("info-realizadas").innerHTML = cantidadRealizada;
    document.getElementById("info-total").innerHTML = tareas.length;
}

const actualizarLista = () => {
    listContainer.innerHTML = "";

    tareas.forEach(element => {
        agregarTareaALista(element);
    });
};

const agregarTareaALista = (newTask) => {
    if (newTask) {
        const div = document.createElement('div');
        div.className = "grid-container";
        div.id = `item-${newTask.id}`;
        div.innerHTML = `
            <p class="grid-item info-id">${newTask.id}</p>
            <p class="grid-item info-tarea ${newTask.completada ? "tachado" : ""}">${newTask.descripcion}</p>
            <input id="check-item-${newTask.id}" class="grid-item check-list check-item" type="checkbox" ${newTask.completada ? "checked" : ""}>
            <button class="image-button grid-item check-btn" id="btn-${newTask.id}">
                <i class="fa-solid fa-x"></i>
            </button>
        `;
        listContainer.appendChild(div);

        const checked = div.querySelector(`#check-item-${newTask.id}`);
        checked.addEventListener('change', () => {
            actualizarObjeto(newTask.id, checked.checked);
        });
        const botonEliminar = div.querySelector(`#btn-${newTask.id}`);
        botonEliminar.addEventListener('click', () => eliminarTarea(newTask.id));
        actualizarValores();
    }
};

const actualizarObjeto = (idToUpdate, checked) => {
    const index = tareas.findIndex(ele => ele.id === idToUpdate);
    let cantidadRealizada = 0;
    if (index !== -1) {
        tareas[index].completada = checked;
        const tareaElemento = document.getElementById(`item-${idToUpdate}`).querySelector('.info-tarea');
        if (tareaElemento) {
            if (checked) {
                tareaElemento.classList.add('tachado');
                cantidadRealizada++;
            } else {
                tareaElemento.classList.remove('tachado');
                cantidadRealizada--;
            }
        }
    }
    actualizarValores();
};

actualizarLista();