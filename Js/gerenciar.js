const API_URL = 'https://controle-de-a-es-jurid-cas.onrender.com';

// 1. LISTAR USUÁRIOS
async function carregarTabela() {
    const response = await fetch(`${API_URL}/usuarios`);
    const usuarios = await response.json();
    const corpo = document.getElementById('tabelaCorpo');
    corpo.innerHTML = '';

    usuarios.forEach(u => {
        corpo.innerHTML += `
            <tr>
                <td>${u.nome}</td>
                <td>${u.login}</td>
                <td>
                    <button class="btn-editar" onclick="editarUsuario(${u.usuario_id}, '${u.nome}', '${u.login}')">✏️ Editar</button>
                    <button class="btn-excluir" onclick="excluirUsuario(${u.usuario_id})">🗑️ Excluir</button>
                </td>
            </tr>
        `;
    });
}

// 2. EXCLUIR USUÁRIO
async function excluirUsuario(id) {
    if (confirm("Kauan, deseja realmente excluir este usuário?")) {
        await fetch(`${API_URL}/usuarios/${id}`, { method: 'DELETE' });
        carregarTabela(); // Atualiza a lista
    }
}

// 3. EDITAR USUÁRIO
async function editarUsuario(id, nomeAtual, loginAtual) {
    const novoNome = prompt("Novo nome:", nomeAtual);
    const novoLogin = prompt("Novo e-mail:", loginAtual);

    if (novoNome && novoLogin) {
        await fetch(`${API_URL}/usuarios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: novoNome, login: novoLogin })
        });
        alert("Usuário atualizado com sucesso!");
        carregarTabela();
    }
}

// Iniciar
carregarTabela();