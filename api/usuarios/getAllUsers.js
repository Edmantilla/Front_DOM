export const getAllUsers = async () => {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
    if (respuesta.ok) {
        return await respuesta.json();
    } else {
        throw new Error('No se pudieron cargar los usuarios');
    }
};
