document.getElementById('formCadastro').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:3000/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, login, senha })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Sucesso: " + result.msg);
            window.location.href = "login.html";
        } else {
            alert("Erro: " + result.msg);
        }
    } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        alert("O servidor está desligado! Rode 'node server.js' no terminal.");
    }
});