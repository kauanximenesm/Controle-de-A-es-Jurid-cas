async function carregarPessoas() {
    try {
        const response = await fetch('https://controle-de-a-es-jur-cas.onrender.com/listar-pessoas', {
            method: 'POST'
        });
        
        if (!response.ok) throw new Error('Erro ao buscar dados do servidor');

        const listaPessoas = await response.json();
        console.log("Dados recebidos do banco:", listaPessoas);

        const tabela = document.getElementById('corpoTabela');
        tabela.innerHTML = ""; 

        if (listaPessoas.length === 0) {
            tabela.innerHTML = "<tr><td colspan='5' style='text-align:center;'>Nenhum registro encontrado no banco.</td></tr>";
            return;
        }

        listaPessoas.forEach(p => {
            const dataFormatada = p.nascimento ? new Date(p.nascimento).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : "N/A";
            
            const linha = `<tr>
                <td>${p.nome}</td>
                <td>${p.cpf}</td>
                <td>${dataFormatada}</td>
                <td>${p.tipo || 'Não definido'}</td>
                <td style="text-align:center;">
                    <button onclick="editarPessoa(${p.pessoa_id}, '${p.nome}')" style="background:#f1c40f; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">
                        ✏️ Editar
                    </button>
                </td>
            </tr>`;
            tabela.innerHTML += linha;
        });
    } catch (error) {
        console.error("Erro ao carregar tabela:", error);
    }
}

async function editarPessoa(id, nomeAntigo) {
    const novoNome = prompt("Novo nome para " + nomeAntigo + ":", nomeAntigo);
    if (!novoNome) return;

    try {
        const response = await fetch('https://controle-de-a-es-jur-cas.onrender.com/editar-pessoa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, nome: novoNome })
        });

        if (response.ok) {
            alert("Atualizado com sucesso!");
            carregarPessoas(); // Recarrega a tabela para mostrar a atualização
        } else {
            alert("Erro ao atualizar.");
        }
    } catch (error) {
        console.error("Erro na edição:", error);
    }
}

// Inicia página abre
carregarPessoas();