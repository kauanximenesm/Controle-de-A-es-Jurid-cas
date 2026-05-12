document.getElementById('formPessoa').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const dados = {
                nome: document.getElementById('p_nome').value,
                cpf: document.getElementById('p_cpf').value,
                nascimento: document.getElementById('p_nascimento').value,
                pessoa_tipo_id: document.getElementById('p_tipo').value
            };

            try {
                const response = await fetch('https://controle-de-a-es-jurid-cas.onrender.com/pessoas', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });

                if (response.ok) {
                    alert("Pessoa cadastrada com sucesso!");
                    window.location.href = "PaginaCentral.html";
                } else {
                    alert("Erro ao realizar cadastro.");
                }
            } catch (error) {
                alert("Erro de conexão com o servidor.");
            }
        });