/**
 * Componente: tareas.js
 * Objetivo: Crear y mostrar la lista de tareas del usuario.
 * 
 * Exporta una función llamada `armarTareas` que recibe:
 * 1. elemento: El contenedor donde se mostrarán.
 * 2. listaTareas: Un array [] con las tareas que traemos de la API.
 */

export const armarTareas = (elemento, listaTareas) => {
    // IMPORTANTE: Fragmento de Documento
    // En lugar de agregar cada tarea una por una al DOM (lo cual es lento),
    // primero armamos todo en este fragmento "invisible" y luego lo insertamos de golpe.
    const fragmento = document.createDocumentFragment();

    // Recorremos la lista de tareas con un ciclo forEach
    // Por cada 'tarea' en la lista, ejecutamos este código:
    listaTareas.forEach(tarea => {
        // PASO 1: Crear el contenedor de la tarjeta de la tarea
        const divTarea = document.createElement('div');
        divTarea.className = 'message-card'; // Usamos la misma clase de CSS que ya existía

        // PASO 2: Crear la cabecera (Título y Estado)
        const divCabecera = document.createElement('div');
        divCabecera.className = 'message-header';

        // Título de la tarea
        const titulo = document.createElement('h3');
        titulo.textContent = tarea.title;        // El texto es el título de la tarea
        titulo.className = 'message-author';     // Reutilizamos estilos

        // Estado (Completada o Pendiente)
        const spanEstado = document.createElement('span');

        // Usamos una estrucutra if/else simple para decidir el estilo y texto
        // Si tarea.completed es verdadero (true)
        if (tarea.completed) {
            spanEstado.className = 'status-completed'; // Clase para color verde
            spanEstado.textContent = 'Completada';
            spanEstado.style.color = 'green';
        } else {
            // Si es falso (false)
            spanEstado.className = 'status-pending';   // Clase para color naranja
            spanEstado.textContent = 'Pendiente';
            spanEstado.style.color = 'orange';
        }

        // Estilos adicionales directos
        spanEstado.style.fontWeight = 'bold';
        spanEstado.style.marginLeft = '10px';

        // Agregamos título y estado a la cabecera
        divCabecera.append(titulo);
        divCabecera.append(spanEstado);

        // PASO 3: Parte principal de la tarea (Descripción)
        const parrafoDescripcion = document.createElement('p');
        parrafoDescripcion.className = 'message-text';

        // Verificamos si existe una descripción ('body')
        if (tarea.body) {
            parrafoDescripcion.textContent = tarea.body;
        } else {
            parrafoDescripcion.textContent = 'Sin descripción disponible';
        }

        // PASO 4: Armar la tarjeta completa
        // Metemos la cabecera y la descripción dentro del div de la tarea
        divTarea.append(divCabecera);
        divTarea.append(parrafoDescripcion);

        // PASO 5: Agregar al Fragmento
        fragmento.append(divTarea);
    });

    // PASO FINAL: Agregar todo el fragmento al elemento del DOM real
    // Aquí es donde las tareas finalmente aparecen en la pantalla
    elemento.append(fragmento);
}
