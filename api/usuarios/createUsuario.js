export const createUsuario = async (nuevoUsuario) => {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(nuevoUsuario),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    if (respuesta.ok) {
        return await respuesta.json();
    } else {
        throw new Error('Hubo un error al registrar el usuario');
    }
};
