const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db/database');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await db.query('SELECT * FROM usuarios WHERE nombre_usuario = $1 AND password = $2', [username, password]); // Cambiado el nombre de la tabla
        if (user.rows.length > 0) {
            res.json({ success: true, role: user.rows[0].tipo_usuario }); // 'tipo_usuario' en lugar de 'role'
        } else {
            res.json({ success: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.post('/addUser', async (req, res) => {
    const { nombre, contrasena, tipoUsuario } = req.body;
    try {
        const query = 'INSERT INTO usuarios (nombre_usuario, password, tipo_usuario) VALUES ($1, $2, $3)';
        await db.query(query, [nombre, contrasena, tipoUsuario]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false });
    }
});

app.get('/getUsers', async (req, res) => {
    try {
        const result = await db.query('SELECT nombre_usuario, tipo_usuario FROM usuarios');
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
});

app.get('/getPlatos', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM plato');
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al obtener los platos' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
