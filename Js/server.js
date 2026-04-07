const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Configurações para o servidor entender JSON e aceitar pedidos do seu site
app.use(cors());
app.use(express.json());

// Conexão com o banco que você já tem no Filess.io
const db = mysql.createConnection({
    host: "opjbvk.h.filess.io",
    user: "Controle_juridico_peopleword",
    password: "286bc9ff035dfe2920ef12e33a98731cfa6134b2", 
    database: "Controle_juridico_peopleword",
    port: 3307
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao Filess.io:", err);
        return;
    }
    console.log("Conectado ao banco de dados com sucesso!");
});

// --- ROTA DE CADASTRO (5º Sprint) ---
app.post('/cadastrar', (req, res) => {
    const { nome, login, senha } = req.body;
    
    // Comando SQL exato para sua tabela tbUsuarios
    const sql = "INSERT INTO tbUsuarios (nome, login, senha) VALUES (?, ?, ?)";
    
    db.query(sql, [nome, login, senha], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "Erro ao gravar no banco" });
        }
        res.status(200).json({ msg: "Usuário gravado com sucesso!" });
    });
});

// --- ROTA DE LOGIN (5º Sprint) ---
app.post('/login', (req, res) => {
    const { login, senha } = req.body;
    
    const sql = "SELECT * FROM tbUsuarios WHERE login = ? AND senha = ?";
    
    db.query(sql, [login, senha], (err, data) => {
        if (err) return res.status(500).json(err);
        
        if (data.length > 0) {
            res.status(200).json({ msg: "Login realizado!", usuario: data[0] });
        } else {
            res.status(401).json({ msg: "E-mail ou senha incorretos" });
        }
    });
});

// O servidor vai ficar ouvindo na porta 3000
app.listen(3000, () => {
    console.log("Servidor CJuris rodando na porta 3000");
});