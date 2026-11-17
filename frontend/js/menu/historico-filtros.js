const form = document.getElementById("form-filtros");
      const valorChip = (nome) =>
        form.querySelector(`input[name="${nome}"]:checked`).value;
      const marcarChip = (nome, valor) => {
        const radio = form.querySelector(
          `input[name="${nome}"][value="${valor}"]`,
        );
        if (radio) radio.checked = true;
      };
      const periodo = document.getElementById("periodo");
      const periodoCustom = document.getElementById("periodo-custom");

      // Mostra as datas quando o período é "Personalizado"
      periodo.addEventListener("change", () => {
        periodoCustom.classList.toggle("visivel", periodo.value === "custom");
      });
      form.addEventListener("limpo", () =>
        periodoCustom.classList.remove("visivel"),
      );

      // Recarrega filtros já salvos
      const salvos = MenuDados.lerFiltros("filtrosHistorico");
      if (salvos.periodo) {
        periodo.value = salvos.periodo;
        periodo.dispatchEvent(new Event("change"));
      }
      if (salvos.inicio)
        document.getElementById("data-inicio").value = salvos.inicio;
      if (salvos.fim) document.getElementById("data-fim").value = salvos.fim;
      if (salvos.categoria)
        document.getElementById("categoria").value = salvos.categoria;
      if (salvos.status !== undefined) marcarChip("status", salvos.status);

      // Salva os filtros e abre a lista
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const filtros = {
          periodo: periodo.value,
          inicio: document.getElementById("data-inicio").value,
          fim: document.getElementById("data-fim").value,
          categoria: document.getElementById("categoria").value,
          status: valorChip("status"),
        };
        MenuDados.salvarFiltros("filtrosHistorico", JSON.stringify(filtros));
        window.location.href = "historico-lista.html";
      });

      // Limpa tudo
      document.getElementById("limpar").addEventListener("click", () => {
        MenuDados.limparFiltros("filtrosHistorico");
        form.reset();
        form.dispatchEvent(new Event("limpo"));
      });
