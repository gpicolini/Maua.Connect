const botao = document.querySelector(".botaoLogar");

botao.addEventListener ("click" , async () => {
        const dadosLogin = {
        email: document.querySelector('[name="email"]').value.trim(),
        senha: document.querySelector('[name="senha"]').value,
        }

        botao.disabled = true;
        
    try {
        const resposta = await fetch("http://localhost:8083/api/entrada/login",
        {
            method: "POST",
            headers: {"content-Type": "application/json"},
            body: JSON.stringify(dadosLogin)
        }
    );

    if(!resposta.ok) {
    const mensagens = {
        400: "Algo deu errado. Confira os campos estão de acordo com o que foi cadastrado",
        401: "Email ou senha incorretos"
    };

    alert(mensagens[resposta.status] ??
    "Algo deu errado, nao foi possivel de realizar o seu login"
    );

    return;

}

    alert ("Login Realizado com sucesso, Bem Vindo(a)!")
        window.location.href ="../menu/central.html";

    } catch (erro) {

console.error ("Algo deu erro, tente novamente em instantes" , erro);
}

finally {
botao.disabled = false
}

});
