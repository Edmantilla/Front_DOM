export const updateUsuario = async (usuarioId, datos) => {
    const respuesta = await fetch(`https://jsonplaceholder.typicode.com/users/${usuarioId}`, {
        method: 'PUT',
        body: JSON.stringify({ id: usuarioId, ...datos }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    if (respuesta.ok) {
        return await respuesta.json();
    } else {
        throw new Error('Hubo un error al actualizar el usuario');
    }
};
