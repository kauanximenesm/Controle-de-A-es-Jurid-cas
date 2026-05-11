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