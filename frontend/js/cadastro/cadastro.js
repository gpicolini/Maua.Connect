const botao = document.querySelector(".botaoCadastrar");

botao.addEventListener("click", async () => {
        const campos = [...document.querySelectorAll('.campoLogin')];
        if (!campos.every(campo => campo.reportValidity())) return;
        const dados = {
        nome: document.querySelector('[name="nome"]').value.trim(),
        email: document.querySelector('[name="email"]').value.trim(),
        senha: document.querySelector('[name="senha"]').value,
        confirmarSenha: document.querySelector('[name="confirmarSenha"]').value
    };

    if (dados.senha !== dados.confirmarSenha) { alert("As senhas não coincidem."); return; }
    botao.disabled = true;

    try {
        const resposta = await fetch(`http://${window.location.hostname}:8082/api/entrada/cadastro`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            }
        );

        if (!resposta.ok) {
            const mensagens = {
                400: "Confira os campos. A senha deve ter pelo menos 8 caracteres e coincidir com a confirmação.",
                409: "Este e-mail já está cadastrado."
            };

            alert(mensagens[resposta.status] ??
                "Não foi possível cadastrar. Confira o log do backend.");
            return;
        }

        alert("Cadastro realizado!");
        window.location.href = "login.html";
    } catch (erro) {
        console.error("Falha ao acessar a API:", erro);
        alert("Não foi possível acessar o backend na porta 8082.");
    } finally {
        botao.disabled = false;
    }
});