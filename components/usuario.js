/**
 * Componente: usuario.js
 * Objetivo: Crear y mostrar la información del usuario en el DOM.
 * 
 * Este archivo exporta una función llamada `armarUsuario` que recibe dos parámetros:
 * 1. elemento: El contenedor HTML donde vamos a poner la información.
 * 2. usuario: El objeto con los datos del usuario que nos devuelve la API.
 */

export const armarUsuario = (elemento, usuario) => {
    // PASO 1: Limpiar el contenedor
    // Es importante vaciar el contenido anterior para que no se acumulen los datos
    // cada vez que buscamos un usuario nuevo.
    elemento.innerHTML = '';

    // PASO 2: Crear un Fragmento de Documento (DocumentFragment)
    // Usar un fragmento es una buena práctica porque nos permite armar toda la estructura
    // en memoria antes de insertarla en la página. Esto mejora el rendimiento porque
    // el navegador solo tiene que "pintar" la página una vez al final.
    const fragmento = document.createDocumentFragment();

    // PASO 3: Crear el contenedor principal de la tarjeta de usuario
    // Creamos un <div> y le asignamos una clase CSS para darle estilo.
    const cajaInfoUsuario = document.createElement('div');
    cajaInfoUsuario.className = 'user-info-container';

    // PASO 4: Crear y llenar los elementos individuales (párrafos)

    // --- Nombre ---
    const parrafoNombre = document.createElement('p');
    // Usamos template literals (las comillas invertidas ` `) para insertar variables dentro del texto.
    // usuario.name viene del objeto que nos dio la API.
    parrafoNombre.innerHTML = `<strong>Nombre:</strong> ${usuario.name}`;
    cajaInfoUsuario.append(parrafoNombre); // Agregamos el párrafo a la caja

    // --- Usuario (Username) ---
    const parrafoUsuario = document.createElement('p');
    parrafoUsuario.innerHTML = `<strong>Usuario:</strong> ${usuario.username}`;
    cajaInfoUsuario.append(parrafoUsuario);

    // --- Email ---
    const parrafoEmail = document.createElement('p');
    parrafoEmail.innerHTML = `<strong>Email:</strong> ${usuario.email}`;
    cajaInfoUsuario.append(parrafoEmail);

    // --- ID ---
    const parrafoId = document.createElement('p');
    parrafoId.innerHTML = `<strong>ID:</strong> ${usuario.id}`;
    cajaInfoUsuario.append(parrafoId);

    // PASO 5: Ensamblaje final
    // Primero agregamos la caja con toda la info al fragmento.
    fragmento.append(cajaInfoUsuario);

    // Y finalmente, agregamos el fragmento al elemento del DOM que recibimos como parámetro.
    elemento.append(fragmento);
}
