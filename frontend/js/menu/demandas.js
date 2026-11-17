// TODO: trocar os dados de exemplo pela chamada ao back-end, ex.:
// const resposta = await fetch('http://localhost:8082/subindoTeste/demandas');

const demandas = [
    { solicitante: 'AACD', tipoSolicitante: 'INSTITUICAO', titulo: 'Impressão de próteses modulares', categoria: 'Prótese Modular', quantidade: 2, status: 'CONCLUIDA', data: '2025-10-27' },
    { solicitante: 'João Silva', tipoSolicitante: 'USUARIO', titulo: 'Prótese Definitiva - Lado Direito', categoria: 'Prótese Definitiva', quantidade: 1, status: 'EM_PRODUCAO', data: '2025-10-26' },
    { solicitante: 'Hospital São Lucas', tipoSolicitante: 'INSTITUICAO', titulo: 'Impressão de prótese parcial', categoria: 'Prótese Parcial', quantidade: 1, status: 'CANCELADA', data: '2025-10-24' },
    { solicitante: 'Maria Oliveira', tipoSolicitante: 'USUARIO', titulo: 'Prótese Modular - Lado Esquerdo', categoria: 'Prótese Modular', quantidade: 1, status: 'CONCLUIDA', data: '2025-10-22' },
    { solicitante: 'Clinica VidaPlus', tipoSolicitante: 'INSTITUICAO', titulo: 'Impressão de prótese definitiva', categoria: 'Prótese Definitiva', quantidade: 3, status: 'EM_PRODUCAO', data: '2025-10-20' },
];

// Gera mais registros de exemplo para demonstrar a paginação (15 no total)
const nomesExemplo = ['Ana Souza', 'Instituto Reabilita', 'Pedro Lima', 'Clínica Movimento', 'Carla Mendes'];
const categoriasExemplo = ['Prótese Modular', 'Prótese Definitiva', 'Prótese Parcial'];
for (let i = 0; i < 10; i++) {
    const categoria = categoriasExemplo[i % 3];
    demandas.push({
        solicitante: nomesExemplo[i % 5],
        tipoSolicitante: i % 2 ? 'INSTITUICAO' : 'USUARIO',
        titulo: `${categoria} - Lado ${i % 2 ? 'Esquerdo' : 'Direito'}`,
        categoria,
        quantidade: (i % 3) + 1,
        status: ['PENDENTE', 'EM_PRODUCAO', 'CONCLUIDA', 'CANCELADA'][i % 4],
        data: new Date(2025, 9, 18 - i * 2).toISOString().slice(0, 10),
    });
}

const ICONE_INSTITUICAO =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 22V3h12v6h6v13h-7v-4h-4v4zm3-15h2V5H6zm4 0h2V5h-2zM6 11h2V9H6zm4 0h2V9h-2zm-4 4h2v-2H6zm4 0h2v-2h-2zm7 0h2v-2h-2zm0 4h2v-2h-2zM6 19h2v-2H6z"/></svg>';
const ICONE_USUARIO =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="7" r="5"/><path d="M3 22a9 9 0 0 1 18 0z"/></svg>';

const formFiltros = document.getElementById('formFiltrosDemandas');
const botoesStatus = formFiltros.querySelectorAll('.opcoesStatus button');
const lista = document.getElementById('listaDemandas');
const contagem = document.getElementById('contagemDemandas');
const paginacao = document.getElementById('paginacaoDemandas');

const referencia = demandas.reduce((max, d) => (d.data > max ? d.data : max), demandas[0].data);
let statusSelecionado = '';
let filtradas = demandas;

botoesStatus.forEach((botao) => {
    botao.addEventListener('click', () => {
        botoesStatus.forEach((b) => b.classList.remove('ativa'));
        botao.classList.add('ativa');
        statusSelecionado = botao.dataset.status;
    });
});

function desenhar(pagina = 1) {
    const itens = paginar({
        itens: filtradas,
        pagina,
        porPagina: 5,
        contagem,
        paginacao,
        nomeItens: 'demandas',
        aoMudar: desenhar,
    });

    if (!itens.length) {
        lista.innerHTML = '<li class="vazio demanda">Nenhuma demanda encontrada com esses filtros.</li>';
        return;
    }

    lista.innerHTML = itens
        .map((d) => {
            const instituicao = d.tipoSolicitante === 'INSTITUICAO';
            const [ano, mes, dia] = d.data.split('-');
            return `<li class="demanda">
                <div class="solicitante">
                    ${instituicao ? ICONE_INSTITUICAO : ICONE_USUARIO}
                    <div>
                        <strong>${escapar(d.solicitante)}</strong>
                        <span>${instituicao ? 'Instituição' : 'Usuário'}</span>
                    </div>
                </div>
                <div class="infoDemanda">
                    <strong>${escapar(d.titulo)}</strong>
                    <span>Categoria: ${escapar(d.categoria)} &nbsp;|&nbsp; Qtd.: ${d.quantidade}</span>
                </div>
                <div class="situacao">
                    ${etiquetaStatus(d.status)}
                    <span class="data">${ICONES.calendario}${dia}/${mes}/${ano}</span>
                </div>
                <button class="botaoContorno" type="button">${ICONES.documento}Ver Detalhes</button>
            </li>`;
        })
        .join('');
}

formFiltros.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const { periodo, categoria, solicitante } = formFiltros.elements;
    const busca = solicitante.value.trim().toLowerCase();

    filtradas = demandas.filter(
        (d) =>
            dentroDoPeriodo(d.data, periodo.value, referencia) &&
            (!statusSelecionado || d.status === statusSelecionado) &&
            (!categoria.value || d.categoria === categoria.value) &&
            (!busca || d.solicitante.toLowerCase().includes(busca)),
    );
    desenhar(1);
});

desenhar(1);
