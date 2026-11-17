const form = document.getElementById("form-filtros");
      const periodo = document.getElementById("periodo");
      const periodoCustom = document.getElementById("periodo-custom");

      // Mostra as datas quando o período é "Personalizado"
      periodo.addEventListener("change", () => {
        periodoCustom.classList.toggle("visivel", periodo.value === "custom");
      });

      // Recarrega filtros já salvos
      const salvos = MenuDados.lerFiltros("filtrosDemandas");
      if (salvos.periodo) {
        periodo.value = salvos.periodo;
        periodo.dispatchEvent(new Event("change"));
      }
      if (salvos.inicio)
        document.getElementById("data-inicio").value = salvos.inicio;
      if (salvos.fim) document.getElementById("data-fim").value = salvos.fim;
      if (salvos.categoria)
        document.getElementById("categoria").value = salvos.categoria;
      if (salvos.solicitante)
        document.getElementById("solicitante").value = salvos.solicitante;
      if (salvos.status !== undefined) {
        const radio = form.querySelector(
          `input[name="status"][value="${salvos.status}"]`,
        );
        if (radio) radio.checked = true;
      }

      // Salva os filtros e abre a lista
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const filtros = {
          periodo: periodo.value,
          inicio: document.getElementById("data-inicio").value,
          fim: document.getElementById("data-fim").value,
          categoria: document.getElementById("categoria").value,
          status: form.querySelector('input[name="status"]:checked').value,
          solicitante: document.getElementById("solicitante").value.trim(),
        };
        MenuDados.salvarFiltros("filtrosDemandas", JSON.stringify(filtros));
        window.location.href = "demandas-lista.html";
      });

      // Limpa tudo
      document.getElementById("limpar").addEventListener("click", () => {
        MenuDados.limparFiltros("filtrosDemandas");
        form.reset();
        periodoCustom.classList.remove("visivel");
      });
