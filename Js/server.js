const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Configurações para o servidor entender JSON e aceitar pedidos do site
app.use(cors());
app.use(express.json());

// Conexão com o banco - Filess.io
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
    const { nome, login, senha, perfil} = req.body;
    
    // Comando SQL exato para sua tabela tbUsuarios
    const sql = "INSERT INTO tbUsuarios (nome, login, senha, atualizado_por) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [nome, login, senha, perfil], (err, result) => {
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

    db.query(sql, [login, senha], (err, result) => {
        if (err) return res.status(500).json(err);
        
        if (result.length > 0) {
            // É AQUI O SEGREDO: Você precisa enviar o perfil de volta!
            res.json({ 
                msg: "Login realizado!", 
                perfil: result[0].atualizado_por // Garanta que o nome da coluna está correto
            });
        } else {
            res.status(401).json({ msg: "Login ou senha incorretos!" });
        }
    });
});

// O servidor vai na porta 3000
app.listen(3000, () => {
    console.log("Servidor CJuris rodando na porta 3000");
});

// 1. LISTAR (Read)
app.get('/usuarios', (req, res) => {
    db.query("SELECT usuario_id, nome, login, atualizado_em FROM tbUsuarios", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// 2. EXCLUIR (Delete)
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM tbUsuarios WHERE usuario_id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ msg: "Usuário excluído com sucesso!" });
    });
});

// 3. EDITAR (Update)
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, login } = req.body;
    
    // atualizado_em = CURRENT_TIMESTAMP
    const sql = "UPDATE tbUsuarios SET nome = ?, login = ?, atualizado_em = CURRENT_TIMESTAMP WHERE usuario_id = ?";
    
    db.query(sql, [nome, login, id], (err, result) => {
        if (err) {
            console.error("Erro ao editar usuário:", err);
            return res.status(500).json({ msg: "Erro interno no servidor", error: err });
        }
        res.json({ msg: "Usuário atualizado com sucesso!" });
    });
});

// --- ROTA DE CADASTRO DE PESSOAS (7º Sprint) ---
app.post('/pessoas', (req, res) => {
    const { nome, cpf, nascimento, pessoa_tipo_id } = req.body;

    // coloquei NULL e 1 como valores padrão para eles não travarem o banco
    const sql = "INSERT INTO tbPessoas (nome, cpf, nascimento, pessoa_tipo_id, telefone, atualizado_por) VALUES (?, ?, ?, ?, NULL, 1)";

    db.query(sql, [nome, cpf, nascimento, pessoa_tipo_id], (err, result) => {
        if (err) {
            console.error("ERRO COMPLETO:", err);
            // Isso vai mostrar pro professor o erro amigável se algo der errado
            return res.status(500).json({ msg: "Erro no banco: " + (err.sqlMessage || "Verifique os campos") });
        }
        res.status(200).json({ msg: "Pessoa cadastrada com sucesso!" });
    });
});

// --- ROTA PARA LISTAR PESSOAS (Sprint 7 - Visualização) ---
app.post('/listar-pessoas', (req, res) => {
    // Buscamos o nome da pessoa e o nome do tipo dela fazendo um JOIN
    const sql = `
        SELECT p.pessoa_id, p.nome, p.cpf, p.nascimento, t.nome as tipo 
        FROM tbPessoas p 
        JOIN tbPessoaTipo t ON p.pessoa_tipo_id = t.pessoa_tipo_id
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.post('/listar-pessoas', (req, res) => {
    // Usamos LEFT JOIN para garantir que, mesmo se o tipo estiver estranho, a pessoa apareça
    const sql = `
        SELECT p.nome, p.cpf, p.nascimento, t.nome as tipo 
        FROM tbPessoas p 
        LEFT JOIN tbPessoaTipo t ON p.pessoa_tipo_id = t.pessoa_tipo_id
    `;
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erro na listagem:", err);
            return res.status(500).json(err);
        }
        res.json(result);
    });
});