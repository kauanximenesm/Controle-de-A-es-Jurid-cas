document.getElementById('formPessoa').addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        nome: document.getElementById('p_nome').value,
        cpf: document.getElementById('p_cpf').value,
        nascimento: document.getElementById('p_nascimento').value,
        pessoa_tipo_id: parseInt(document.getElementById('p_tipo').value)
    };

    try {
        const response = await fetch('https://controle-de-a-es-jurid-cas.onrender.com/pessoas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Pessoa cadastrada com sucesso na tbPessoas!");
            window.location.href = "PaginaCentral.html";
        } else {
            alert("Erro: " + result.msg);
        }
    } catch (error) {
        console.error("Erro ao conectar:", error);
        alert("Erro de conexão com o servidor.");
    }
})

async function carregarListaPessoas() {
    const response = await fetch('https://controle-de-a-es-jurid-cas.onrender.com/listar-pessoas', {
        method: 'POST'
    });
    const pessoas = await response.json();
    
    // Aqui você usaria um forEach para montar as linhas de uma tabela 
    // ou mostrar no painel de status
    console.log("Pessoas cadastradas:", pessoas);
}

carregarListaPessoas();