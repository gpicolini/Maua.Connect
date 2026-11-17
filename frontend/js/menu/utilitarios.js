// Funções compartilhadas pelas telas do painel (Histórico, Impressoras e Demandas)

const ICONES = {
    concluida:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#2e8b2a"/><path d="m7 12.5 3.2 3.2L17 9" fill="none" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    relogio:
        '<svg viewBox="0 0 24 24" fill="none" stroke="#2f5fd0" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3 2"/></svg>',
    cancelada:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#6b6570"/><path d="m8.5 8.5 7 7m0-7-7 7" stroke="white" stroke-width="2.4" stroke-linecap="round"/></svg>',
    pendente:
        '<svg viewBox="0 0 24 24" fill="none" stroke="#b46d00" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M12 7v6m0 3.5v.01"/></svg>',
    documento:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2"/></svg>',
    grafico:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 3v18h18M8 17V9M12 17V5M16 17v-6M20 17v-3"/></svg>',
    calendario:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>',
};

// Mapeia cada status para classe CSS e ícone
const STATUS = {
    CONCLUIDA: { texto: 'Concluída', classe: 'statusConcluida', icone: ICONES.concluida },
    EM_PRODUCAO: { texto: 'Em Produção', classe: 'statusProducao', icone: ICONES.relogio },
    CANCELADA: { texto: 'Cancelada', classe: 'statusCancelada', icone: ICONES.cancelada },
    PENDENTE: { texto: 'Pendente', classe: 'statusPendente', icone: ICONES.pendente },
    DISPONIVEL: { texto: 'Disponível', classe: 'statusDisponivel', icone: ICONES.concluida },
    EM_MANUTENCAO: { texto: 'Em Manutenção', classe: 'statusManutencao', icone: ICONES.relogio },
    OFFLINE: { texto: 'Offline', classe: 'statusOffline', icone: ICONES.cancelada },
};

function etiquetaStatus(codigo) {
    const s = STATUS[codigo] || { texto: codigo, classe: '', icone: '' };
    return `<span class="status ${s.classe}">${s.icone}${s.texto}</span>`;
}

// Evita que textos vindos do back-end sejam interpretados como HTML
function escapar(texto) {
    const div = document.createElement('div');
    div.textContent = texto ?? '';
    return div.innerHTML;
}

function formatarDataHora(iso) {
    const d = new Date(iso);
    const data = d.toLocaleDateString('pt-BR');
    const hora = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return { data, hora };
}

// Filtra por período: "7", "30", "90" dias ou "" (todos). A referência é a data mais recente da lista.
function dentroDoPeriodo(iso, dias, referencia) {
    if (!dias) return true;
    const limite = new Date(referencia);
    limite.setDate(limite.getDate() - Number(dias));
    return new Date(iso) >= limite;
}

// Desenha os botões de paginação e devolve os itens da página atual
function paginar({ itens, pagina, porPagina, contagem, paginacao, nomeItens, aoMudar }) {
    const total = itens.length;
    const totalPaginas = Math.max(1, Math.ceil(total / porPagina));
    const atual = Math.min(pagina, totalPaginas);
    const inicio = (atual - 1) * porPagina;
    const pagItens = itens.slice(inicio, inicio + porPagina);

    contagem.textContent = total
        ? `Mostrando ${inicio + 1} a ${inicio + pagItens.length} de ${total} ${nomeItens}`
        : `Nenhum(a) ${nomeItens} encontrado(a)`;

    paginacao.innerHTML = '';
    const botao = (rotulo, destino, desabilitado, ativo, aria) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.innerHTML = rotulo;
        b.disabled = desabilitado;
        if (ativo) b.classList.add('ativa');
        if (aria) b.setAttribute('aria-label', aria);
        b.addEventListener('click', () => aoMudar(destino));
        paginacao.appendChild(b);
    };

    botao('&#8249;', atual - 1, atual === 1, false, 'Página anterior');
    for (let i = 1; i <= totalPaginas; i++) botao(String(i), i, false, i === atual);
    botao('&#8250;', atual + 1, atual === totalPaginas, false, 'Próxima página');

    return pagItens;
}
