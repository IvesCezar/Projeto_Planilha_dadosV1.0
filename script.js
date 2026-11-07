const URL_PLANILHA = "https://script.google.com/macros/s/AKfycbxWM0E22Io5Fb2XNkvoHRKH1nqyGbsiHE_Ik1DqfYiiFqID7AZN8cLzhTP-DQvpzRJO/exec";

const form = document.getElementById("formulario");
const aviso = document.getElementById("aviso");

form.addEventListener("submit", function (event){
    event.preventDefault(); // Impede o recarregamento da página
    
    // Mostra mensagem de aguardando e desabilita o botão para evitar cliques duplos
    aviso.textContent = "Enviando dados, aguarde...";
    aviso.style.color = "#e07a5f"; 
    const botaoSubmit = form.querySelector("button");
    botaoSubmit.disabled = true;

    fetch(URL_PLANILHA, {
        method: "POST",
        mode: "no-cors",
        body: new FormData(form)
    })
    .then(() => {
        // Sucesso
        aviso.textContent = "Pedido cadastrado com sucesso!";
        aviso.style.color = "#81b29a"; // Fica verde
        
        // Força a limpeza de todos os campos do formulário
        form.reset();
        
        // Reabilita o botão
        botaoSubmit.disabled = false;

        // Apaga a mensagem de sucesso após 4 segundos para o próximo cadastro
        setTimeout(() => {
            aviso.textContent = "";
        }, 4000);
    })
    .catch((error) => {
        // Erro
        aviso.textContent = "Erro ao enviar. Tente novamente.";
        aviso.style.color = "red";
        botaoSubmit.disabled = false;
    });
});