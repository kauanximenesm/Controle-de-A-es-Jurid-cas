async function carregarPessoas() {
    try {
        const response = await fetch('https://controle-de-a-es-jurid-cas.onrender.com/listar-pessoas', {
            method: 'POST'
        });
        const listaPessoas = await response.json();
        const tabela = document.getElementById('corpoTabela');
        tabela.innerHTML = ""; 

        listaPessoas.forEach(p => {
            const dataFormatada = p.nascimento ? new Date(p.nascimento).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : "N/A";
            
            // Aqui criamos os dois botões na mesma coluna
            const linha = `<tr>
        <td><strong>${p.nome}</strong></td>
        <td>${p.cpf}</td>
        <td>${dataFormatada}</td>
        <td><span class="badge-tipo">${p.tipo || 'Cliente'}</span></td>
        <td style="text-align: center;">
            <button onclick="editarPessoa(${p.pessoa_id}, '${p.nome}')" class="btn-action btn-edit">
                <span class="material-icons">edit</span> Editar
            </button>
            <button onclick="excluirPessoa(${p.pessoa_id})" class="btn-action btn-delete">
                <span class="material-icons">delete</span> Excluir
            </button>
        </td>
        </tr>`;
    tabela.innerHTML += linha;
    });
    } catch (error) {
        console.error("Erro ao carregar tabela:", error);
    }
}

// FUNÇÃO PARA EDITAR
async function editarPessoa(id, nomeAntigo) {
    const novoNome = prompt("Novo nome para " + nomeAntigo + ":", nomeAntigo);
    if (!novoNome) return;

    const response = await fetch('https://controle-de-a-es-jurid-cas.onrender.com/editar-pessoa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, nome: novoNome })
    });

    if (response.ok) {
        alert("Nome atualizado!");
        carregarPessoas(); 
    }
}

// FUNÇÃO PARA EXCLUIR
async function excluirPessoa(id) {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    const response = await fetch(`https://controle-de-a-es-jurid-cas.onrender.com/excluir-pessoa/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert("Registro removido!");
        carregarPessoas();
    }
}

carregarPessoas();