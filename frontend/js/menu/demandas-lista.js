// ===== Dados de exemplo (depois troque pelos dados do back-end) =====
      const demandas = [
        {
          solicitante: "AACD",
          tipo: "Instituição",
          titulo: "Impressão de próteses modulares",
          categoria: "Prótese Modular",
          qtd: 2,
          status: "Concluída",
          data: "2025-10-27",
        },
        {
          solicitante: "João Silva",
          tipo: "Usuário",
          titulo: "Prótese Definitiva - Lado Direito",
          categoria: "Prótese Definitiva",
          qtd: 1,
          status: "Em Produção",
          data: "2025-10-26",
        },
        {
          solicitante: "Hospital São Lucas",
          tipo: "Instituição",
          titulo: "Impressão de prótese parcial",
          categoria: "Prótese Parcial",
          qtd: 1,
          status: "Cancelada",
          data: "2025-10-24",
        },
        {
          solicitante: "Maria Oliveira",
          tipo: "Usuário",
          titulo: "Prótese Modular - Lado Esquerdo",
          categoria: "Prótese Modular",
          qtd: 1,
          status: "Concluída",
          data: "2025-10-22",
        },
        {
          solicitante: "Clínica VidaPlus",
          tipo: "Instituição",
          titulo: "Impressão de prótese definitiva",
          categoria: "Prótese Definitiva",
          qtd: 3,
          status: "Em Produção",
          data: "2025-10-20",
        },
        {
          solicitante: "AACD",
          tipo: "Instituição",
          titulo: "Órtese de punho - infantil",
          categoria: "Órtese",
          qtd: 1,
          status: "Em Produção",
          data: "2025-10-18",
        },
        {
          solicitante: "Carlos Mendes",
          tipo: "Usuário",
          titulo: "Adaptador de talher",
          categoria: "Adaptador",
          qtd: 2,
          status: "Pendente",
          data: "2025-10-16",
        },
        {
          solicitante: "Lab. Engenharia",
          tipo: "Instituição",
          titulo: "Suporte para tablet - cadeira de rodas",
          categoria: "Adaptador",
          qtd: 1,
          status: "Pendente",
          data: "2025-10-15",
        },
        {
          solicitante: "FabLab Santo André",
          tipo: "Instituição",
          titulo: "Engrossador de lápis",
          categoria: "Adaptador",
          qtd: 4,
          status: "Concluída",
          data: "2025-10-12",
        },
        {
          solicitante: "Ana Souza",
          tipo: "Usuário",
          titulo: "Prótese de mão - dedos",
          categoria: "Prótese Parcial",
          qtd: 1,
          status: "Pendente",
          data: "2025-10-10",
        },
        {
          solicitante: "Clínica VidaPlus",
          tipo: "Instituição",
          titulo: "Órtese de tornozelo",
          categoria: "Órtese",
          qtd: 2,
          status: "Em Produção",
          data: "2025-10-08",
        },
        {
          solicitante: "Pedro Lima",
          tipo: "Usuário",
          titulo: "Prótese Modular - Antebraço",
          categoria: "Prótese Modular",
          qtd: 1,
          status: "Em Produção",
          data: "2025-10-05",
        },
        {
          solicitante: "Hospital São Lucas",
          tipo: "Instituição",
          titulo: "Adaptador de escova de dentes",
          categoria: "Adaptador",
          qtd: 3,
          status: "Cancelada",
          data: "2025-10-03",
        },
        {
          solicitante: "AACD",
          tipo: "Instituição",
          titulo: "Órtese de dedo",
          categoria: "Órtese",
          qtd: 2,
          status: "Pendente",
          data: "2025-10-01",
        },
        {
          solicitante: "Beatriz Rocha",
          tipo: "Usuário",
          titulo: "Prótese Definitiva - Lado Esquerdo",
          categoria: "Prótese Definitiva",
          qtd: 1,
          status: "Em Produção",
          data: "2025-09-28",
        },
      ];

      const POR_PAGINA = 5;
      let paginaAtual = 1;

      // ===== Filtros salvos pela tela de filtros =====
      const f = MenuDados.lerFiltros("filtrosDemandas");

      function passaNoFiltro(d) {
        if (f.status && d.status !== f.status) return false;
        if (f.categoria && d.categoria !== f.categoria) return false;
        if (
          f.solicitante &&
          !d.solicitante.toLowerCase().includes(f.solicitante.toLowerCase())
        )
          return false;
        if (f.periodo === "custom") {
          if (f.inicio && d.data < f.inicio) return false;
          if (f.fim && d.data > f.fim) return false;
        } else if (f.periodo) {
          const limite = new Date();
          limite.setDate(limite.getDate() - Number(f.periodo));
          if (new Date(d.data) < limite) return false;
        }
        return true;
      }

      const filtradas = demandas.filter(passaNoFiltro);

      // Texto do botão "Filtro: ..."
      const ativos = [
        f.status,
        f.categoria,
        f.solicitante,
        f.periodo && "período",
      ].filter(Boolean);
      document.getElementById("texto-filtro").textContent = ativos.length
        ? `Filtros ativos: ${ativos.length}`
        : "Filtro: todos";

      // ===== Helpers de exibição =====
      const classeStatus = {
        Concluída: "concluida",
        "Em Produção": "producao",
        Cancelada: "cancelada",
        Pendente: "pendente",
      };
      const iconeStatus = {
        Concluída: "ti-circle-check",
        "Em Produção": "ti-clock",
        Cancelada: "ti-circle-x",
        Pendente: "ti-hourglass",
      };
      const formataData = (iso) => iso.split("-").reverse().join("/");

      function renderizar() {
        const lista = document.getElementById("lista");
        const inicio = (paginaAtual - 1) * POR_PAGINA;
        const pagina = filtradas.slice(inicio, inicio + POR_PAGINA);

        if (!pagina.length) {
          lista.innerHTML = `<p class="vazio">Nenhuma demanda encontrada com esses filtros.</p>`;
        } else {
          lista.innerHTML = pagina
            .map(
              (d, indice) => `
          <article class="item">
            <i class="ti ${d.tipo === "Instituição" ? "ti-building" : "ti-user"}"></i>
            <div class="solicitante">
              <div class="titulo">${d.solicitante}</div>
              <div class="secundario">${d.tipo}</div>
            </div>
            <div>
              <div class="titulo">${d.titulo}</div>
              <div class="secundario">Categoria: ${d.categoria} &nbsp;|&nbsp; Qtd.: ${d.qtd}</div>
            </div>
            <div>
              <span class="badge ${classeStatus[d.status]}"><i class="ti ${iconeStatus[d.status]}"></i>${d.status}</span>
              <div class="data"><i class="ti ti-calendar"></i>${formataData(d.data)}</div>
            </div>
            <button type="button" class="btn-detalhes" data-detalhe="${inicio + indice}"><i class="ti ti-file-text"></i>Ver detalhes</button>
          </article>
        `,
            )
            .join("");
        }

        const fim = Math.min(inicio + POR_PAGINA, filtradas.length);
        document.getElementById("contador").textContent = filtradas.length
          ? `Mostrando ${inicio + 1} a ${fim} de ${filtradas.length} demandas`
          : "Mostrando 0 demandas";

        renderizarPaginacao();
      }

      function renderizarPaginacao() {
        const totalPaginas = Math.max(
          1,
          Math.ceil(filtradas.length / POR_PAGINA),
        );
        const pag = document.getElementById("paginacao");
        let html = `<button ${paginaAtual === 1 ? "disabled" : ""} data-ir="${paginaAtual - 1}">‹</button>`;
        for (let i = 1; i <= totalPaginas; i++) {
          html += `<button class="${i === paginaAtual ? "atual" : ""}" data-ir="${i}">${i}</button>`;
        }
        html += `<button ${paginaAtual === totalPaginas ? "disabled" : ""} data-ir="${paginaAtual + 1}">›</button>`;
        pag.innerHTML = html;
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
 if(botao) MenuDados.mostrarDetalhes(filtradas[Number(botao.dataset.detalhe)]);
});
