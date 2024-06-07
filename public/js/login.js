document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (result.success) {
        if (result.role === 'admin') { // Utilizando 'role' que proviene de 'tipo_usuario'
            window.location.href = 'admin.html';
        } else if (result.role === 'usuario') {
            window.location.href = 'usuario.html';
        } else {
            document.getElementById('message').innerHTML = '<div class="alert alert-danger">Tipo de usuario no asignado</div>';
        }
    } else {
        document.getElementById('message').innerHTML = '<div class="alert alert-danger">Usuario o contraseña incorrectos</div>';
    }
});
