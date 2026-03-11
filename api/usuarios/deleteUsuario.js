export const deleteUsuario = async (usuarioId) => {
    const respuesta = await fetch(`https://jsonplaceholder.typicode.com/users/${usuarioId}`, {
        method: 'DELETE',
    });
    if (respuesta.ok) {
        return true;
    } else {
        return false;
    }
};
