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