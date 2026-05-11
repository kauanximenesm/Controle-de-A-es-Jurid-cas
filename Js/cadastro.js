document.getElementById('formCadastro').addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Captura os valores
    const nome = document.getElementById('nome').value;
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;
    const perfil = document.getElementById('perfil').value; // Captura o select que adicionamos

    // 2. Validação de Caracteres Especiais (ANTES do fetch)
    const regexEspecial = /[!@#$%^&*(),.?":{}|<>]/;
    if (!regexEspecial.test(senha)) {
        alert("A senha precisa de pelo menos um caractere especial!");
        return; // Para a execução aqui e não envia ao servidor
    }

    try {
        console.log("Enviando dados para o Render...");
        
        const response = await fetch('https://controle-de-a-es-jurid-cas.onrender.com/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Enviando nome, login, senha e o perfil escolhido
            body: JSON.stringify({ nome, login, senha, perfil })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Sucesso: " + result.msg);
            window.location.href = "Login.html";
        } else {
            alert("Erro: " + result.msg);
        }
    } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        alert("O servidor no Render pode estar 'acordando'. Tente novamente em 30 segundos!");
    }
});