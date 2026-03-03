/**
 * Componente: filtros.js
 * Objetivo: Construir y renderizar el panel de filtros en el DOM.
 *
 * Exporta `armarFiltros` que genera los controles de filtrado
 * (selects de Estado y Usuario) dentro del contenedor indicado.
 */

/**
 * Construye el panel de filtros con los usuarios disponibles.
 * @param {HTMLElement} contenedor - Donde se renderiza el panel.
 * @param {Array} usuarios - Lista de objetos usuario [{ id, name }...]
 * @returns {Object} - Referencias a los selects { selectEstado, selectUsuario }
 */
export const armarFiltros = (contenedor, usuarios = []) => {
    contenedor.innerHTML = '';

    // --- Contenedor principal del panel ---
    const panel = document.createElement('div');
    panel.className = 'filter-panel';

    // --- Título del panel ---
    const titulo = document.createElement('h3');
    titulo.className = 'filter-panel__title';
    titulo.textContent = '🔎 Filtrar Tareas';

    // --- Wrapper de controles ---
    const controles = document.createElement('div');
    controles.className = 'filter-controls';

    // ==============================
    // SELECT: Filtro por Estado
    // ==============================
    const grupoEstado = document.createElement('div');
    grupoEstado.className = 'filter-group';

    const labelEstado = document.createElement('label');
    labelEstado.htmlFor = 'filtroEstado';
    labelEstado.className = 'filter-label';
    labelEstado.textContent = 'Estado';

    const selectEstado = document.createElement('select');
    selectEstado.id = 'filtroEstado';
    selectEstado.className = 'filter-select';

    const opcionesEstado = [
        { value: 'all', text: 'Todos los estados' },
        { value: 'pending', text: '🕐 Pendiente' },
        { value: 'in-progress', text: '⚡ En proceso' },
        { value: 'completed', text: '✅ Completada' },
    ];

    opcionesEstado.forEach(op => {
        const option = document.createElement('option');
        option.value = op.value;
        option.textContent = op.text;
        selectEstado.append(option);
    });

    grupoEstado.append(labelEstado, selectEstado);

    // ==============================
    // SELECT: Filtro por Usuario
    // ==============================
    const grupoUsuario = document.createElement('div');
    grupoUsuario.className = 'filter-group';

    const labelUsuario = document.createElement('label');
    labelUsuario.htmlFor = 'filtroUsuario';
    labelUsuario.className = 'filter-label';
    labelUsuario.textContent = 'Usuario';

    const selectUsuario = document.createElement('select');
    selectUsuario.id = 'filtroUsuario';
    selectUsuario.className = 'filter-select';

    // Opción "todos"
    const optTodos = document.createElement('option');
    optTodos.value = 'all';
    optTodos.textContent = 'Todos los usuarios';
    selectUsuario.append(optTodos);

    // Opciones dinámicas por usuario
    usuarios.forEach(u => {
        const opt = document.createElement('option');
        opt.value = String(u.id);
        opt.textContent = `👤 ${u.name}`;
        selectUsuario.append(opt);
    });

    grupoUsuario.append(labelUsuario, selectUsuario);

    // ==============================
    // BADGE de resultados
    // ==============================
    const badge = document.createElement('div');
    badge.className = 'filter-badge';
    badge.id = 'filterResultsBadge';
    badge.textContent = 'Mostrando todas las tareas';

    // --- Botón limpiar filtros ---
    const btnLimpiar = document.createElement('button');
    btnLimpiar.className = 'filter-clear-btn';
    btnLimpiar.id = 'filterClearBtn';
    btnLimpiar.textContent = '✕ Limpiar filtros';

    // --- Ensamblaje ---
    controles.append(grupoEstado, grupoUsuario, badge, btnLimpiar);
    panel.append(titulo, controles);
    contenedor.append(panel);

    return { selectEstado, selectUsuario, badge, btnLimpiar };
};
