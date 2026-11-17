// TODO: trocar os dados de exemplo pela chamada ao back-end, ex.:
// const resposta = await fetch('http://localhost:8082/subindoTeste/maquinas');
// Para mostrar a foto da impressora, preencha "foto" com o caminho da imagem
// (ex.: '../../imagens/menu/impressoras/ender3.png'). Sem foto, aparece um ícone.

const impressoras = [
    { nome: 'Creality Ender 3 V2', local: 'Laboratório Principal', categoria: 'Prótese Modular', status: 'DISPONIVEL', ultima: '2025-10-27T14:32', foto: '' },
    { nome: 'Formlabs Form 3', local: 'Laboratório de Pesquisa', categoria: 'Prótese Definitiva', status: 'EM_MANUTENCAO', ultima: '2025-10-26T16:20', foto: '' },
    { nome: 'Raise3D Pro2', local: 'Laboratório de Engenharia', categoria: 'Prótese Parcial', status: 'DISPONIVEL', ultima: '2025-10-25T11:15', foto: '' },
    { nome: 'Bambu Lab P1S', local: 'Laboratório Principal', categoria: 'Prótese Modular', status: 'OFFLINE', ultima: '2025-10-24T19:50', foto: '' },
];

const ICONE_IMPRESSORA =
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="4" width="32" height="40" rx="2"/><path d="M8 12h32M14 12v24M34 12v24M14 22h20M20 22v6h8v-6M12 40h24"/></svg>';

const ICONE_LOCAL =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';

const formFiltros = document.getElementById('formFiltrosImpressoras');
const corpo = document.getElementById('corpoImpressoras');
const contagem = document.getElementById('contagemImpressoras');
const paginacao = document.getElementById('paginacaoImpressoras');
const botaoAtualizar = formFiltros.querySelector('.botaoPrincipal');

let filtradas = impressoras;

function desenhar(pagina = 1) {
    const itens = paginar({
        itens: filtradas,
        pagina,
        porPagina: 5,
        contagem,
        paginacao,
        nomeItens: 'impressoras',
        aoMudar: desenhar,
    });

    if (!itens.length) {
        corpo.innerHTML = '<tr><td class="vazio" colspan="5">Nenhuma impressora encontrada com esses filtros.</td></tr>';
        return;
    }

    corpo.innerHTML = itens
        .map((i) => {
            const { data, hora } = formatarDataHora(i.ultima);
            const foto = i.foto ? `<img src="${escapar(i.foto)}" alt="">` : ICONE_IMPRESSORA;
            return `<tr>
                <td>
                    <div class="impressora">
                        <div class="fotoImpressora">${foto}</div>
                        <div>
                            <strong>${escapar(i.nome)}</strong>
                            <span class="local">${ICONE_LOCAL}${escapar(i.local)}</span>
                        </div>
                    </div>
                </td>
                <td>${escapar(i.categoria)}</td>
                <td>${etiquetaStatus(i.status)}</td>
                <td>${data}<br>${hora}</td>
                <td><button class="botaoContorno" type="button">${ICONES.grafico}Ver Detalhes</button></td>
            </tr>`;
        })
        .join('');
}

formFiltros.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const { status, categoria, localizacao } = formFiltros.elements;

    filtradas = impressoras.filter(
        (i) =>
            (!status.value || i.status === status.value) &&
            (!categoria.value || i.categoria === categoria.value) &&
            (!localizacao.value || i.local === localizacao.value),
    );

    botaoAtualizar.classList.remove('girando');
    void botaoAtualizar.offsetWidth; // reinicia a animação do ícone
    botaoAtualizar.classList.add('girando');
    desenhar(1);
});

desenhar(1);
