/**
 * Archivo Principal: script.js
 * Objetivo: Controlar la lógica de la aplicación, manejar eventos y conectar con la API.
 * 
 * IMPORTACIONES:
 * Traemos las funciones que creamos en la carpeta 'components'.
 * - armarUsuario: Función para mostrar los datos del usuario.
 * - armarTareas: Función para mostrar la lista de tareas.
 * 
 * Usamos "./components/index.js" para mantener el código ordenado.
 */
import { armarUsuario, armarTareas } from "./components/index.js";

// ==========================================
// REFERENCIAS AL DOM (HTML)
// ==========================================
// Aquí guardamos en variables los elementos de la página que vamos a manipular.
// Usamos 'const' porque la referencia al elemento no va a cambiar.

const formularioBusqueda = document.getElementById("searchForm");
const entradaIdUsuario = document.getElementById("userId");
const errorIdUsuario = document.getElementById("userIdError");

// Secciones que mostramos u ocultamos
const seccionInfoUsuario = document.getElementById("userInfoSection");
const contenedorInfoUsuario = document.getElementById("userInfoContainer");

const seccionFormularioTarea = document.getElementById("taskFormSection");
const formularioTarea = document.getElementById("taskForm");

const seccionListaTareas = document.getElementById("tasksListSection");
const contenedorTareas = document.getElementById("tasksContainer");

// ==========================================
// VARIABLES DE ESTADO
// ==========================================
// Usamos 'let' porque el valor de esta variable va a cambiar durante el uso de la app.
// Inicialmente es null porque no hemos buscado a nadie.
let usuarioActual = null;

// ==========================================
// EVENTO 1: BUSCAR USUARIO
// ==========================================
// Escuchamos cuando el usuario envía el formulario de búsqueda (click en Buscar o Enter).
formularioBusqueda.addEventListener("submit", async (evento) => {
    // 1. Evitamos que la página se recargue (comportamiento por defecto de los formularios).
    evento.preventDefault();

    // 2. Obtenemos el valor que escribió el usuario en el campo de texto.
    const idUsuario = entradaIdUsuario.value;

    // 3. Validación básica: Si el campo está vacío, mostramos error y paramos.
    if (idUsuario === "") {
        mostrarError("Por favor ingresa un número de ID");
        return; // 'return' detiene la ejecución de la función aquí.
    }

    try {
        // 4. Hacemos la petición a la API (simulando una base de datos real).
        // Usamos 'await' para esperar a que el servidor responda antes de seguir.
        const respuesta = await fetch(`https://jsonplaceholder.typicode.com/users/${idUsuario}`);

        // 5. Verificamos si el servidor nos respondió con un código "OK" (200).
        if (respuesta.ok) {
            // Convertimos la respuesta cruda a un objeto JSON que JavaScript entienda.
            usuarioActual = await respuesta.json();

            // --- MANIPULACIÓN DEL DOM ---

            // A. Mostrar información del usuario usando nuestro componente importado.
            armarUsuario(contenedorInfoUsuario, usuarioActual);

            // B. Hacer visibles las secciones que estaban ocultas (.hidden).
            seccionInfoUsuario.classList.remove("hidden");
            seccionFormularioTarea.classList.remove("hidden");
            seccionListaTareas.classList.remove("hidden");

            // C. Limpiar cualquier mensaje de error anterior.
            errorIdUsuario.textContent = "";

            // D. Cargar las tareas que este usuario ya tiene guardadas.
            cargarTareasDelUsuario(idUsuario);

        } else {
            // Si la respuesta no fue OK (ej: error 404), lanzamos un error manual.
            throw new Error("Usuario no encontrado");
        }

    } catch (error) {
        // 'catch' captura cualquier error que haya ocurrido en el bloque 'try'.
        console.error(error); // Mostramos el error en la consola para depurar.
        mostrarError("Usuario no encontrado en el sistema");
        ocultarSecciones(); // Ocultamos todo para no mostrar info errónea.
    }
});

// ==========================================
// EVENTO 2: AGREGAR NUEVA TAREA
// ==========================================
formularioTarea.addEventListener("submit", async (evento) => {
    evento.preventDefault(); // Prevenir recarga

    // Seguridad: Si por alguna razón no hay usuario cargado, no hacemos nada.
    if (usuarioActual === null) {
        return;
    }

    // 1. Obtenemos los valores de los inputs del formulario de tareas.
    const titulo = document.getElementById("taskTitle").value;
    const descripcion = document.getElementById("taskBody").value;
    const estadoSeleccionado = document.getElementById("taskCompleted").value;

    // 2. Convertimos el string "true"/"false" del select a un booleano real (true/false).
    let estaCompletada = false;
    if (estadoSeleccionado === "true") {
        estaCompletada = true;
    }

    // 3. Validación: El título es obligatorio.
    if (titulo === "") {
        alert("El título es obligatorio");
        return;
    }

    // 4. Creamos el objeto de la nueva tarea con la estructura que espera la API.
    const nuevaTarea = {
        title: titulo,
        body: descripcion,
        completed: estaCompletada,
        userId: usuarioActual.id // Asociamos la tarea al ID del usuario actual.
    };

    try {
        // 5. Configuración para enviar datos (POST) a la API.
        const opciones = {
            method: 'POST', // Método HTTP para crear.
            body: JSON.stringify(nuevaTarea), // Convertimos nuestro objeto a texto JSON.
            headers: {
                'Content-type': 'application/json; charset=UTF-8', // Le decimos al servidor que enviamos JSON.
            },
        };

        // 6. Enviamos la petición.
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/todos', opciones);

        // 7. Obtenemos la confirmación de la API.
        // Nota: JSONPlaceholder simula la creación, devuelve la tarea con un ID falso (siempre 201).
        const tareaCreada = await respuesta.json();

        console.log("Tarea creada con éxito (simulado):", tareaCreada);

        // 8. Actualizamos la interfaz visualmente.
        // Como 'armarTareas' espera una lista (array), metemos nuestra nueva tarea en un array [].
        const listaParaAgregar = [nuevaTarea];
        armarTareas(contenedorTareas, listaParaAgregar);

        // 9. Limpiamos el formulario para dejarlo listo para la siguiente tarea.
        formularioTarea.reset();

    } catch (error) {
        console.error("Error al crear tarea:", error);
        alert("Hubo un error al guardar la tarea");
    }
});

// ==========================================
// FUNCIÓN 3: CARGAR TAREAS EXISTENTES
// ==========================================
async function cargarTareasDelUsuario(idUsuario) {
    // Limpiamos la lista visual antes de cargar nuevas.
    contenedorTareas.innerHTML = '';

    try {
        // Pedimos las tareas filtradas por el ID del usuario (?userId=...)
        const respuesta = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${idUsuario}`);
        const listaDeTareas = await respuesta.json();

        // Para este ejercicio, mostramos solo las primeras 5 tareas para no llenar la pantalla.
        // .slice(0, 5) corta el array y toma desde el índice 0 hasta el 5.
        const primerasTareas = listaDeTareas.slice(0, 5);

        // Usamos nuestro componente para pintar las tareas en el HTML.
        armarTareas(contenedorTareas, primerasTareas);

    } catch (error) {
        console.error("Error cargando tareas:", error);
    }
}

// ==========================================
// FUNCIONES DE APOYO (HELPERS)
// ==========================================

// Muestra el mensaje de error debajo del campo de ID
function mostrarError(mensaje) {
    errorIdUsuario.textContent = mensaje;
    ocultarSecciones();
}

// Oculta todas las secciones de información y resetea el estado
function ocultarSecciones() {
    seccionInfoUsuario.classList.add("hidden");
    seccionFormularioTarea.classList.add("hidden");
    seccionListaTareas.classList.add("hidden");

    // Limpiamos el HTML interno para que no quede basura visual
    contenedorInfoUsuario.innerHTML = "";
    contenedorTareas.innerHTML = "";

    // Reseteamos la variable global
    usuarioActual = null;
}
