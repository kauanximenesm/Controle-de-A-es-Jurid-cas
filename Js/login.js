document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const login = document.getElementById('email').value; // Usando o id 'email' do seu HTML
    const senha = document.getElementById('password').value; // Usando o id 'password' do seu HTML

    try {
        const response = await fetch('https://controle-de-a-es-jurid-cas.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, senha })
        });

        const result = await response.json();

        if (response.ok) {
        // ... dentro do if (response.ok)
        console.log("Dados recebidos do servidor:", result); // ADICIONE ISSO PARA DEBUGAR
        if (result.perfil) {
        localStorage.setItem('perfilUsuario', result.perfil);
        } else if (result.usuario && result.usuario.pessoa_tipo_id) {
         // Caso seu servidor envie dentro de um objeto 'usuario'
        localStorage.setItem('perfilUsuario', result.usuario.pessoa_tipo_id);
        }

        alert("Bem-vindo ao CJuris!");
        window.location.href = "PaginaCentral.html";
        } else {
            alert("Erro: " + result.msg);
        }
    } catch (error) {
        console.error("Erro ao conectar:", error);
        alert("Servidor acordando ou offline! Tente novamente em alguns segundos.");
    }
});