const storage = window.localStorage;

let tareas = [];

window.onload = function () {
  const tareasLocal = storage.getItem("tareas");
  const tareasList = JSON.parse(tareasLocal);

  tareasList.forEach((tarea) => {
    tareas.push(tarea);
  });

  pintarTablero();
  console.log("Arreglo de Tareas", tareas);
};

function crearTareaHtml(idTarea, descripcion) {
  return `
    <div id='${idTarea}' class="tarjeta">
        <div class="cerrar" >
        <i onclick='eliminarTarea(${idTarea})' class="bx bx-x-circle close"></i>
        </div>
        <div class="descripcion">${descripcion}</div>
        <div class="botones">
        <div class="botton1" onclick='bajarTarea(${idTarea})'></div>
        <div class="botton2" onclick='subirTarea(${idTarea})'></div>
        </div>
    </div>
    `;
}

function bajarTarea(idTarea) {
  const tarea = tareas.find((tarea) => {
    if (tarea.id == idTarea) return true;
    else return false;
  });

  if (tarea.estado == "DONE") {
    tarea.estado = "DOING";
  } else if (tarea.estado == "DOING") {
    tarea.estado = "TODO";
  } else if (tarea.estado == "TODO") {
    console.log("Ya esta Iniciada");
  }

  pintarTablero();

  storage.setItem("tareas", JSON.stringify(tareas));
  console.log("Bajar Tarea", idTarea);
}

function subirTarea(idTarea) {
  const tarea = tareas.find((tarea) => {
    if (tarea.id == idTarea) return true;
    else return false;
  });

  if (tarea.estado == "TODO") {
    tarea.estado = "DOING";
  } else if (tarea.estado == "DOING") {
    tarea.estado = "DONE";
  } else if (tarea.estado == "DONE") {
    console.log("Ya esta terminada");
  }

  pintarTablero();

  storage.setItem("tareas", JSON.stringify(tareas));
  console.log("Subir Tarea", idTarea);
}

function eliminarTarea(idTarea) {
  tareas = tareas.filter((tarea) => {
    if (tarea.id !== idTarea) return true;
    else return false;
  });

  pintarTablero();

  storage.setItem("tareas", JSON.stringify(tareas));
  console.log("Eliminar Tarea", idTarea);
}

function addTarea() {
  const newTareaDescripcionRef = document.getElementById("adicionarTarea");
  const newTareaDescripcion = newTareaDescripcionRef.value;

  const idSiguiente = getSiguienteId();

  const tarea = new Tarea(idSiguiente, newTareaDescripcion, "TODO");

  tareas.push(tarea);

  pintarTablero();

  storage.setItem("tareas", JSON.stringify(tareas));

  console.log("Adicionar Tarea", tareas);
  newTareaDescripcionRef.value = "";
}

function pintarTablero() {
  const todoContenedor = document.getElementById("todo");
  const doingContenedor = document.getElementById("doing");
  const doneContenedor = document.getElementById("done");

  todoContenedor.innerHTML = "";
  doingContenedor.innerHTML = "";
  doneContenedor.innerHTML = "";

  tareas.forEach((tarea) => {
    if (tarea.estado == "TODO") {
      todoContenedor.innerHTML += crearTareaHtml(tarea.id, tarea.descripcion);
    }
    if (tarea.estado == "DOING") {
      doingContenedor.innerHTML += crearTareaHtml(tarea.id, tarea.descripcion);
    }
    if (tarea.estado == "DONE") {
      doneContenedor.innerHTML += crearTareaHtml(tarea.id, tarea.descripcion);
    }
  });
}
function getSiguienteId() {
  const contadorLocal = storage.getItem("consecutivo");
  let contador;

  if (!contadorLocal) {
    //Se inicializa el contador por no existir en localstorage
    contador = 0;
  } else {
    //convertir a number
    contador = +contadorLocal;
  }

  //Incrementamos le contador
  contador++;
  console.log("contador", contador);
  storage.setItem("consecutivo", contador);
  return contador;
}
