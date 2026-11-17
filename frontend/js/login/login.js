const botao = document.querySelector(".botaoEntrar");

botao.addEventListener ("click" , async () => {
        const campos = [...document.querySelectorAll('.campoLogin')];
        if (!campos.every(campo => campo.reportValidity())) return;
        const dadosLogin = {
        email: document.querySelector('[name="email"]').value.trim(),
        senha: document.querySelector('[name="senha"]').value,
        }

        botao.disabled = true;
        
    try {
        const resposta = await fetch(`http://${window.location.hostname}:8082/api/entrada/login`,
        {
            credentials: "include",
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

console.error ("Falha ao acessar a API", erro);
alert("Não foi possível acessar o servidor. Confira se o backend está ligado.");
}

finally {
botao.disabled = false
}

});
