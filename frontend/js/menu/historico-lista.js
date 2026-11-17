// ===== Dados de exemplo (depois troque pelos dados do back-end) =====
      const historico = [
        {
          data: "2025-10-27T18:05",
          categoria: "Transfemoral",
          tipo: "Prótese Modular",
          lado: "Direito",
          status: "Concluída",
        },
        {
          data: "2025-10-26T16:17",
          categoria: "Transtibial",
          tipo: "Prótese Definitiva",
          lado: "Esquerdo",
          status: "Concluída",
        },
        {
          data: "2025-10-25T09:17",
          categoria: "Transfemoral",
          tipo: "Prótese Modular",
          lado: "Direito",
          status: "Em Produção",
        },
        {
          data: "2025-10-24T11:50",
          categoria: "Transtibial",
          tipo: "Prótese Definitiva",
          lado: "Esquerdo",
          status: "Cancelada",
        },
        {
          data: "2025-10-23T08:45",
          categoria: "Transfemoral",
          tipo: "Prótese Modular",
          lado: "Direito",
          status: "Concluída",
        },
        {
          data: "2025-10-21T16:05",
          categoria: "Transtibial",
          tipo: "Prótese Definitiva",
          lado: "Direito",
          status: "Concluída",
        },
        {
          data: "2025-10-19T13:05",
          categoria: "Transfemoral",
          tipo: "Prótese Modular",
          lado: "Direito",
          status: "Em Produção",
        },
        {
          data: "2025-10-18T15:50",
          categoria: "Transfemoral",
          tipo: "Prótese Parcial",
          lado: "Direito",
          status: "Concluída",
        },
        {
          data: "2025-10-15T13:20",
          categoria: "Transtibial",
          tipo: "Prótese Definitiva",
          lado: "Esquerdo",
          status: "Concluída",
        },
        {
          data: "2025-10-13T09:45",
          categoria: "Transfemoral",
          tipo: "Prótese Parcial",
          lado: "Direito",
          status: "Concluída",
        },
        {
          data: "2025-10-11T12:45",
          categoria: "Transtibial",
          tipo: "Prótese Definitiva",
          lado: "Esquerdo",
          status: "Concluída",
        },
        {
          data: "2025-10-10T10:20",
          categoria: "Transfemoral",
          tipo: "Prótese Parcial",
          lado: "Esquerdo",
          status: "Cancelada",
        },
        {
          data: "2025-10-08T18:05",
          categoria: "Transtibial",
          tipo: "Prótese Definitiva",
          lado: "Direito",
          status: "Concluída",
        },
        {
          data: "2025-10-06T17:32",
          categoria: "Transtibial",
          tipo: "Prótese Parcial",
          lado: "Esquerdo",
          status: "Concluída",
        },
        {
          data: "2025-10-03T15:50",
          categoria: "Transfemoral",
          tipo: "Prótese Modular",
          lado: "Esquerdo",
          status: "Concluída",
        },
        {
          data: "2025-10-02T18:45",
          categoria: "Transfemoral",
          tipo: "Prótese Parcial",
          lado: "Esquerdo",
          status: "Concluída",
        },
        {
          data: "2025-09-29T18:20",
          categoria: "Transtibial",
          tipo: "Prótese Parcial",
          lado: "Esquerdo",
          status: "Concluída",
        },
        {
          data: "2025-09-28T17:05",
          categoria: "Transtibial",
          tipo: "Prótese Definitiva",
          lado: "Direito",
          status: "Concluída",
        },
        {
          data: "2025-09-25T10:50",
          categoria: "Transfemoral",
          tipo: "Prótese Modular",
          lado: "Esquerdo",
          status: "Concluída",
        },
        {
          data: "2025-09-23T09:17",
          categoria: "Transtibial",
          tipo: "Prótese Definitiva",
          lado: "Esquerdo",
          status: "Cancelada",
        },
        {
          data: "2025-09-20T10:32",
          categoria: "Transtibial",
          tipo: "Prótese Parcial",
          lado: "Esquerdo",
          status: "Concluída",
        },
        {
          data: "2025-09-18T11:17",
          categoria: "Transtibial",
          tipo: "Prótese Definitiva",
          lado: "Esquerdo",
          status: "Concluída",
        },
        {
          data: "2025-09-17T18:17",
          categoria: "Transfemoral",
          tipo: "Prótese Modular",
          lado: "Direito",
          status: "Concluída",
        },
        {
          data: "2025-09-16T12:20",
          categoria: "Transtibial",
          tipo: "Prótese Parcial",
          lado: "Direito",
          status: "Concluída",
        },
        {
          data: "2025-09-15T17:45",
          categoria: "Transfemoral",
          tipo: "Prótese Definitiva",
          lado: "Esquerdo",
          status: "Concluída",
        },
      ];

      const POR_PAGINA = 5;
      let paginaAtual = 1;

      // ===== Filtros salvos pela tela de filtros =====
      const f = MenuDados.lerFiltros("filtrosHistorico");

      function passaNoPeriodo(iso) {
        const data = iso.split("T")[0];
        if (f.periodo === "custom") {
          if (f.inicio && data < f.inicio) return false;
          if (f.fim && data > f.fim) return false;
        } else if (f.periodo) {
          const limite = new Date();
          limite.setDate(limite.getDate() - Number(f.periodo));
          if (new Date(data) < limite) return false;
        }
        return true;
      }

      const filtrados = historico.filter(
        (d) =>
          (!f.status || d.status === f.status) &&
          (!f.categoria || d.categoria === f.categoria) &&
          passaNoPeriodo(d.data),
      );
      const ativos = [f.status, f.categoria, f.periodo].filter(Boolean).length;
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
<span class="ico"><i class="ti ti-calendar-event"></i></span>
<div class="divide">
<div class="rotulo-col">Data da impressão</div>
<div class="titulo">${formataDataHora(d.data)}</div>
</div>
<div><div class="rotulo-col">Categoria</div><div class="valor">${d.categoria}</div></div>
<div><div class="rotulo-col">Tipo de prótese</div><div class="valor">${d.tipo}</div></div>
<div><div class="rotulo-col">Lado de uso</div><div class="valor">${d.lado}</div></div>
<div>${badge(d.status)}</div>
<button type="button" class="btn-detalhes" data-detalhe="${inicio + indice}"><i class="ti ti-file-text"></i>Ver detalhes</button>
</article>`,
            )
            .join("");
        }

        const fim = Math.min(inicio + POR_PAGINA, filtrados.length);
        document.getElementById("contador").textContent = filtrados.length
          ? `Mostrando ${inicio + 1} a ${fim} de ${filtrados.length} registros`
          : "Mostrando 0 registros";

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
