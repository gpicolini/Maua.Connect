// TODO: ajustar para o endpoint real do back-end quando estiver pronto
const URL_API = 'http://localhost:8082/subindoTeste/proteses';

const formulario = document.getElementById('formSolicitarProtese');
const descricao = document.getElementById('descricao');
const contador = document.getElementById('contadorDescricao');
const mensagem = document.getElementById('mensagemSolicitacao');
const botaoEnviar = formulario.querySelector('.botaoPrincipal');

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = 'mensagem mensagem' + tipo;
}

descricao.addEventListener('input', () => {
    contador.textContent = descricao.value.length + '/500';
});

function lerDados() {
    const campos = formulario.elements;
    return {
        categoria: campos.categoria.value,
        tipo: campos.tipo.value,
        lado: campos.lado.value,
        faixaEtaria: campos.faixaEtaria.value,
        descricao: campos.descricao.value.trim(),
    };
}

function validar(dados) {
    if (!dados.categoria || !dados.tipo || !dados.lado || !dados.faixaEtaria) {
        return 'Preencha todos os campos obrigatórios.';
    }
    if (dados.descricao.length < 10) {
        return 'Descreva a prótese com pelo menos 10 caracteres.';
    }
    return null;
}

formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const dados = lerDados();
    const erro = validar(dados);
    if (erro) {
        mostrarMensagem(erro, 'Erro');
        return;
    }

    botaoEnviar.disabled = true;
    mostrarMensagem('Enviando pedido...', '');

    try {
        const resposta = await fetch(URL_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        });

        if (!resposta.ok) {
            throw new Error(resposta.status === 404 || resposta.status === 501 ? 'O envio de solicitações ainda não está disponível.' : 'Não foi possível enviar o pedido. Tente novamente.');
        }

        mostrarMensagem('Pedido enviado com sucesso!', 'Sucesso');
        formulario.reset();
        contador.textContent = '0/500';
    } catch (e) {
        mostrarMensagem(e instanceof TypeError ? 'Não foi possível acessar o servidor. Tente novamente.' : e.message, 'Erro');
    } finally {
        botaoEnviar.disabled = false;
    }
});
