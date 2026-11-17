// ===== Dados de exemplo (depois troque pelos dados do back-end) =====
      const impressoras = [
        {
          nome: "Creality Ender 3 V2",
          local: "Laboratório Principal",
          categoria: "Prótese Modular",
          status: "Disponível",
          ultima: "2025-10-27T14:32",
        },
        {
          nome: "Formlabs Form 3",
          local: "Laboratório de Pesquisa",
          categoria: "Prótese Definitiva",
          status: "Em Manutenção",
          ultima: "2025-10-26T16:20",
        },
        {
          nome: "Raise3D Pro2",
          local: "Laboratório de Engenharia",
          categoria: "Prótese Parcial",
          status: "Disponível",
          ultima: "2025-10-25T11:15",
        },
        {
          nome: "Bambu Lab P1S",
          local: "Laboratório Principal",
          categoria: "Prótese Modular",
          status: "Offline",
          ultima: "2025-10-24T19:50",
        },
      ];

      const POR_PAGINA = 5;
      let paginaAtual = 1;

      // ===== Filtros salvos pela tela de filtros =====
      const f = MenuDados.lerFiltros("filtrosImpressoras");
      const filtrados = impressoras.filter(
        (d) =>
          (!f.status || d.status === f.status) &&
          (!f.categoria || d.categoria === f.categoria) &&
          (!f.localizacao || d.local === f.localizacao),
      );
      const ativos = [f.status, f.categoria, f.localizacao].filter(
        Boolean,
      ).length;
      document.getElementById("texto-filtro").textContent = ativos
        ? `Filtros ativos: ${ativos}`
        : "Filtro: todos";

      const formataDataHora = (iso) => {
        const [data, hora] = iso.split("T");
        return `${data.split("-").reverse().join("/")} às ${hora}`;
      };

      // ===== Helpers de exibição =====
      const estiloStatus = {
        Disponível: ["verde", "ti-circle-check"],
        Concluída: ["verde", "ti-circle-check"],
        "Em Manutenção": ["azul", "ti-clock"],
        "Em Produção": ["azul", "ti-clock"],
        Offline: ["cinza", "ti-circle-x"],
        Cancelada: ["cinza", "ti-circle-x"],
      };
      const badge = (status) =>
        `<span class="badge ${estiloStatus[status][0]}"><i class="ti ${estiloStatus[status][1]}"></i>${status}</span>`;

      function renderizar() {
        const lista = document.getElementById("lista");
        const inicio = (paginaAtual - 1) * POR_PAGINA;
        const pagina = filtrados.slice(inicio, inicio + POR_PAGINA);

        if (!pagina.length) {
          lista.innerHTML = `<p class="vazio">Nenhum registro encontrado com esses filtros.</p>`;
        } else {
          lista.innerHTML = pagina
            .map(
              (d, indice) => `
<article class="item">
<span class="ico"><i class="ti ti-printer"></i></span>
<div class="divide">
<div class="titulo">${d.nome}</div>
<div class="secundario"><i class="ti ti-map-pin"></i>${d.local}</div>
</div>
<div><div class="rotulo-col">Categoria</div><div class="valor">${d.categoria}</div></div>
<div>${badge(d.status)}</div>
<div><div class="rotulo-col">Última impressão</div><div class="valor">${formataDataHora(d.ultima)}</div></div>
<button type="button" class="btn-detalhes" data-detalhe="${inicio + indice}"><i class="ti ti-chart-bar"></i>Ver detalhes</button>
</article>`,
            )
            .join("");
        }

        const fim = Math.min(inicio + POR_PAGINA, filtrados.length);
        document.getElementById("contador").textContent = filtrados.length
          ? `Mostrando ${inicio + 1} a ${fim} de ${filtrados.length} impressoras`
          : "Mostrando 0 impressoras";

        renderizarPaginacao();
      }

      function renderizarPaginacao() {
        const totalPaginas = Math.max(
          1,
          Math.ceil(filtrados.length / POR_PAGINA),
        );
        let html = `<button ${paginaAtual === 1 ? "disabled" : ""} data-ir="${paginaAtual - 1}">‹</button>`;
        for (let i = 1; i <= totalPaginas; i++) {
          html += `<button class="${i === paginaAtual ? "atual" : ""}" data-ir="${i}">${i}</button>`;
        }
        html += `<button ${paginaAtual === totalPaginas ? "disabled" : ""} data-ir="${paginaAtual + 1}">›</button>`;
        document.getElementById("paginacao").innerHTML = html;
      }

      document.getElementById("paginacao").addEventListener("click", (e) => {
        const botao = e.target.closest("button");
        if (!botao || botao.disabled) return;
        paginaAtual = Number(botao.dataset.ir);
        renderizar();
      });

      renderizar();
    
document.getElementById("lista").addEventListener("click", (e) => {
 const botao=e.target.closest("[data-detalhe]");
 if(botao) MenuDados.mostrarDetalhes(filtrados[Number(botao.dataset.detalhe)]);
});
