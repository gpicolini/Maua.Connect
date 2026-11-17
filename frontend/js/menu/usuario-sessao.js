// O nome vem da sessão autenticada no backend, sem guardar credenciais no navegador.
(async () => {
    const nomeElemento = document.querySelector('[data-usuario-nome]');
    const iniciaisElemento = document.querySelector('[data-usuario-iniciais]');
    if (!nomeElemento || !iniciaisElemento) return;

    try {
        const resposta = await fetch(`http://${window.location.hostname}:8082/api/entrada/sessao`, {
            credentials: 'include',
            cache: 'no-store'
        });

        if (resposta.status === 401) {
            nomeElemento.textContent = 'Faça login para continuar';
            nomeElemento.href = '../inicio/login.html';
            iniciaisElemento.textContent = '?';
            return;
        }
        if (!resposta.ok) throw new Error(`Falha ao consultar sessão: ${resposta.status}`);

        const usuario = await resposta.json();
        const nome = typeof usuario.nome === 'string' ? usuario.nome.trim().replace(/\s+/gu, ' ') : '';
        if (!nome) throw new Error('A sessão não retornou o nome do usuário.');

        nomeElemento.textContent = `Olá, ${nome}`;
        nomeElemento.removeAttribute('href');
        nomeElemento.title = nome;
        const partes = nome.split(' ');
        const inicial = parte => Array.from(parte)[0] || '';
        iniciaisElemento.textContent = (inicial(partes[0]) + (partes.length > 1 ? inicial(partes[partes.length - 1]) : '')).toLocaleUpperCase('pt-BR');
        iniciaisElemento.setAttribute('aria-label', `Iniciais de ${nome}`);
    } catch (erro) {
        nomeElemento.textContent = 'Não foi possível carregar seu nome';
        iniciaisElemento.textContent = '?';
        console.error('Falha ao consultar o usuário da sessão:', erro);
    }
})();