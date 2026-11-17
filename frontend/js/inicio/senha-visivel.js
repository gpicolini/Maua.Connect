// Cada botão controla somente o campo de senha ao seu lado.
const pastaIconesSenha = new URL('../../imagens/inicio/icones/', document.currentScript.src);

document.querySelectorAll('.botaoOlho').forEach((botao) =>
    
    {
    const campo = botao.closest('.campoComIcone')?.querySelector('input');
    const imagem = botao.querySelector('img');
    
    if (!campo)
        return;

    const descricao = campo.name === 'confirmarSenha' ? 'confirmação de senha' : 'senha';

    function atualizarIcone()
    {
        const visivel = campo.type === 'text';
        botao.setAttribute('aria-pressed', String(visivel));
        botao.setAttribute('aria-label', `${visivel ? 'Ocultar' : 'Mostrar'} ${descricao}`);
        
        if (imagem)
        {
            imagem.src = new URL(visivel ? 'icone-olho.svg' : 'icone-olho-fechado.svg', pastaIconesSenha).href;
            imagem.alt = '';
        }
    }

    atualizarIcone();
    botao.addEventListener
    ('click', () =>
    
    {
        campo.type = campo.type === 'password' ? 'text' : 'password';
        atualizarIcone();
    }
    );
});