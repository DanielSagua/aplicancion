document.getElementById('addUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const contrasena = document.getElementById('contrasena').value;
    const tipoUsuario = document.getElementById('tipoUsuario').value;

    try {
        const response = await fetch('/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, contrasena, tipoUsuario })
        });

        const result = await response.json();

        if (result.success) {
            alert('Usuario agregado correctamente');
            window.location.reload();
        } else {
            alert('Hubo un problema al agregar el usuario');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al agregar el usuario');
    }
});
