// TODO: trocar os dados de exemplo pela chamada ao back-end, ex.:
// const resposta = await fetch('http://localhost:8082/subindoTeste/impressoes');
// const impressoes = await resposta.json();

const impressoes = [
    { data: '2025-10-27T14:32', categoria: 'Transfemoral', tipo: 'Prótese Modular', lado: 'Direito', status: 'CONCLUIDA' },
    { data: '2025-10-25T09:17', categoria: 'Transtibial', tipo: 'Prótese Definitiva', lado: 'Esquerdo', status: 'CONCLUIDA' },
    { data: '2025-10-20T16:45', categoria: 'Transfemoral', tipo: 'Prótese Modular', lado: 'Direito', status: 'EM_PRODUCAO' },
    { data: '2025-10-18T11:20', categoria: 'Transtibial', tipo: 'Prótese Definitiva', lado: 'Esquerdo', status: 'CANCELADA' },
    { data: '2025-10-15T13:50', categoria: 'Transfemoral', tipo: 'Prótese Modular', lado: 'Direito', status: 'CONCLUIDA' },
];

// Gera mais registros de exemplo para demonstrar a paginação (25 no total)
for (let i = 0; i < 20; i++) {
    const d = new Date(2025, 9, 14 - i, 8 + (i % 9), (i * 13) % 60);
    impressoes.push({
        data: d.toISOString(),
        categoria: i % 2 ? 'Transtibial' : 'Transfemoral',
        tipo: i % 3 ? 'Prótese Modular' : 'Prótese Definitiva',
        lado: i % 2 ? 'Esquerdo' : 'Direito',
        status: ['CONCLUIDA', 'CONCLUIDA', 'EM_PRODUCAO', 'CANCELADA'][i % 4],
    });
}

const formFiltros = document.getElementById('formFiltros');
const corpo = document.getElementById('corpoHistorico');
const contagem = document.getElementById('contagemHistorico');
const paginacao = document.getElementById('paginacaoHistorico');

const referencia = impressoes.reduce((max, i) => (i.data > max ? i.data : max), impressoes[0].data);
let filtradas = impressoes;

function desenhar(pagina = 1) {
    const itens = paginar({
        itens: filtradas,
        pagina,
        porPagina: 5,
        contagem,
        paginacao,
        nomeItens: 'registros',
        aoMudar: desenhar,
    });

    if (!itens.length) {
        corpo.innerHTML = '<tr><td class="vazio" colspan="6">Nenhuma impressão encontrada com esses filtros.</td></tr>';
        return;
    }

    corpo.innerHTML = itens
        .map((i) => {
            const { data, hora } = formatarDataHora(i.data);
            return `<tr>
                <td>${data} às ${hora}</td>
                <td>${escapar(i.categoria)}</td>
                <td>${escapar(i.tipo)}</td>
                <td>${escapar(i.lado)}</td>
                <td>${etiquetaStatus(i.status)}</td>
                <td class="colunaAcoes"><button class="botaoContorno" type="button">${ICONES.documento}Ver Detalhes</button></td>
            </tr>`;
        })
        .join('');
}

formFiltros.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const { periodo, categoria, status } = formFiltros.elements;

    filtradas = impressoes.filter(
        (i) =>
            dentroDoPeriodo(i.data, periodo.value, referencia) &&
            (!categoria.value || i.categoria === categoria.value) &&
            (!status.value || i.status === status.value),
    );
    desenhar(1);
});

desenhar(1);
