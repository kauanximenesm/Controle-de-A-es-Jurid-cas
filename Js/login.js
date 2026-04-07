document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const login = document.getElementById('email').value; // Usando o id 'email' do seu HTML
    const senha = document.getElementById('password').value; // Usando o id 'password' do seu HTML

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, senha })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Bem-vindo ao CJuris!");
            // Redireciona para a página principal após o login
            window.location.href = "PaginaCentral.html"; 
        } else {
            alert("Erro: " + result.msg);
        }
    } catch (error) {
        console.error("Erro ao conectar:", error);
        alert("Servidor offline! Ligue o servidor com 'node server.js'");
    }
});