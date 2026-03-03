/**
 * Módulo: filterService.js
 * Objetivo: Gestionar el estado global de las tareas y la lógica de filtrado.
 * 
 * Actúa como fuente de verdad centralizada para todas las tareas cargadas,
 * permitiendo filtrarlas por estado y/o usuario de forma combinada y sin
 * recargar la página.
 */

// ==========================================
// ESTADO INTERNO (privado al módulo)
// ==========================================
let todasLasTareas = [];        // Array con TODAS las tareas del usuario (sin filtrar)
let filtroEstado = 'all';       // 'all' | 'pending' | 'in-progress' | 'completed'
let filtroUsuario = 'all';      // 'all' | '1' | '2' | ...

// ==========================================
// GESTIÓN DE TAREAS
// ==========================================

/**
 * Reemplaza el array completo de tareas (se usa al cargar).
 * @param {Array} tareas - Lista de tareas traídas de la API.
 */
export const guardarTareas = (tareas) => {
    todasLasTareas = tareas;
};

/**
 * Añade una tarea individual al array (se usa al crear).
 * @param {Object} tarea - Objeto de la nueva tarea.
 */
export const agregarTarea = (tarea) => {
    todasLasTareas.push(tarea);
};

/**
 * Actualiza una tarea existente en el array por su id.
 * @param {string|number} id - ID de la tarea a actualizar.
 * @param {Object} datos - Datos actualizados de la tarea.
 */
export const actualizarTareaEnEstado = (id, datos) => {
    const index = todasLasTareas.findIndex(t => String(t.id) === String(id));
    if (index !== -1) {
        todasLasTareas[index] = { ...todasLasTareas[index], ...datos };
    }
};

/**
 * Elimina una tarea del array por su id.
 * @param {string|number} id - ID de la tarea a eliminar.
 */
export const eliminarTareaDelEstado = (id) => {
    todasLasTareas = todasLasTareas.filter(t => String(t.id) !== String(id));
};

/**
 * Retorna una copia del array completo sin filtrar.
 */
export const obtenerTodasLasTareas = () => [...todasLasTareas];

// ==========================================
// GESTIÓN DE FILTROS
// ==========================================

/**
 * Establece el filtro de estado.
 * @param {string} valor - 'all' | 'pending' | 'in-progress' | 'completed'
 */
export const setFiltroEstado = (valor) => {
    filtroEstado = valor;
};

/**
 * Establece el filtro de usuario.
 * @param {string} valor - 'all' | id del usuario como string
 */
export const setFiltroUsuario = (valor) => {
    filtroUsuario = valor;
};

/**
 * Retorna el valor actual del filtro de estado.
 */
export const getFiltroEstado = () => filtroEstado;

/**
 * Retorna el valor actual del filtro de usuario.
 */
export const getFiltroUsuario = () => filtroUsuario;

/**
 * Resetea los filtros a su valor por defecto.
 */
export const resetearFiltros = () => {
    filtroEstado = 'all';
    filtroUsuario = 'all';
};

// ==========================================
// LÓGICA DE FILTRADO
// ==========================================

/**
 * Retorna las tareas filtradas según los filtros activos (estado y usuario combinados).
 * @returns {Array} - Array de tareas que cumplen los criterios de filtrado.
 */
export const obtenerTareasFiltradas = () => {
    return todasLasTareas.filter(tarea => {
        // --- Filtro por Estado ---
        let pasaEstado = true;
        if (filtroEstado !== 'all') {
            const estadoTarea = tarea.status || (tarea.completed ? 'completed' : 'pending');
            pasaEstado = estadoTarea === filtroEstado;
        }

        // --- Filtro por Usuario ---
        let pasaUsuario = true;
        if (filtroUsuario !== 'all') {
            pasaUsuario = String(tarea.userId) === String(filtroUsuario);
        }

        return pasaEstado && pasaUsuario;
    });
};
