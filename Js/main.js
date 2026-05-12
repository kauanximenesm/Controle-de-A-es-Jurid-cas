const painel = document.getElementById('status-painel');

function novaAcao() {
    painel.innerHTML = "📝 Abrindo formulário de <strong>Novo Processo</strong>...";
    painel.style.borderLeftColor = "#27ae60";
}

function verPrazos() {
    painel.innerHTML = "⚠️ Você tem <strong>3 processos</strong> com prazo vencendo hoje!";
    painel.style.borderLeftColor = "#e74c3c";
}

function listarAdvogados() {
    painel.innerHTML = "👨‍⚖️ Carregando lista de advogados associados...";
    painel.style.borderLeftColor = "#3498db";
}

function gerarRelatorio() {
    alert("Relatório PDF sendo gerado...");
    painel.innerHTML = "📄 Relatório de Março exportado com sucesso.";
}

document.addEventListener("DOMContentLoaded", function() {
    // 1. Busca o perfil que o login.js salvou no navegador
    const perfil = localStorage.getItem('perfilUsuario'); 

    // Debug: isso vai mostrar no F12 se o valor está chegando como '5'
    console.log("Perfil detectado:", perfil);

    // 2. Se for 5 (Administrador),força o botão a aparecer
    if (perfil === '5') {
        const btnAdmin = document.getElementById('btnAdminGestao');
        if (btnAdmin) {
            btnAdmin.style.display = 'flex'; // Mostra o botão com alinhamento flex
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const perfil = localStorage.getItem('perfilUsuario'); 
    
    // Perfil 5 = Admin, Perfil 1 = Advogado (ajuste o número se o seu Advogado for outro ID)
    if (perfil == '5' || perfil == '1') {
        const btn = document.getElementById('btnVerPessoas');
        if (btn) btn.style.display = 'flex';
    }
});