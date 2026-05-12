async function carregarPessoas() {
    try {
        const response = await fetch('https://controle-de-a-es-jur-cas.onrender.com/listar-pessoas', {
            method: 'POST'
        });
        const dados = await response.json();
        console.log("Dados recebidos do banco:", dados); //  F12

        const tabela = document.getElementById('corpoTabela');
        tabela.innerHTML = ""; // Limpa antes de carregar

        if (dados.length === 0) {
            tabela.innerHTML = "<tr><td colspan='4'>Nenhum registro encontrado no banco.</td></tr>";
            return;
        }

        dados.forEach(p => {
            const dataFormatada = p.nascimento ? new Date(p.nascimento).toLocaleDateString('pt-BR') : "N/A";
            const linha = `<tr>
                <td>${p.nome}</td>
                <td>${p.cpf}</td>
                <td>${dataFormatada}</td>
                <td>${p.tipo || 'Não definido'}</td>
            </tr>`;
            tabela.innerHTML += linha;
        });
    } catch (error) {
        console.error("Erro ao carregar tabela:", error);
    }
}
carregarPessoas();

dados.forEach(p => {
    const linha = `<tr>
        <td>${p.nome}</td>
        <td>${p.cpf}</td>
        <td><button onclick="editarPessoa(${p.pessoa_id}, '${p.nome}')" style="background:#f1c40f; border:none; padding:5px; cursor:pointer;">✏️</button></td>
    </tr>`;
    tabela.innerHTML += linha;
});

async function editarPessoa(id, nomeAntigo) {
    const novoNome = prompt("Novo nome para " + nomeAntigo + ":", nomeAntigo);
    if (!novoNome) return;

    const response = await fetch('https://controle-de-a-es-jurid-cas.onrender.com/editar-pessoa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, nome: novoNome })
    });

    if (response.ok) {
        alert("Atualizado!");
        location.reload();
    }
}