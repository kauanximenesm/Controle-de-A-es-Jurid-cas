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
    // Pega o perfil que salvamos no localStorage durante o login
    const perfil = localStorage.getItem('perfilUsuario'); 

    console.log("Perfil atual logado:", perfil); // Isso vai nos mostrar no F12 se o login está salvando certo

    if (perfil === '5') {
        // Se for Admin, a gente mostra o botão
        document.getElementById('btnAdminGestao').style.display = 'flex';
    }
});

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