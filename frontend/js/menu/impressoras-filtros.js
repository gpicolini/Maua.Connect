const form = document.getElementById("form-filtros");
      const valorChip = (nome) =>
        form.querySelector(`input[name="${nome}"]:checked`).value;
      const marcarChip = (nome, valor) => {
        const radio = form.querySelector(
          `input[name="${nome}"][value="${valor}"]`,
        );
        if (radio) radio.checked = true;
      };

      // Recarrega filtros já salvos
      const salvos = MenuDados.lerFiltros("filtrosImpressoras");
      if (salvos.status !== undefined) marcarChip("status", salvos.status);
      if (salvos.categoria)
        document.getElementById("categoria").value = salvos.categoria;
      if (salvos.localizacao)
        document.getElementById("localizacao").value = salvos.localizacao;

      // Salva os filtros e abre a lista
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const filtros = {
          status: valorChip("status"),
          categoria: document.getElementById("categoria").value,
          localizacao: document.getElementById("localizacao").value,
        };
        MenuDados.salvarFiltros("filtrosImpressoras", JSON.stringify(filtros));
        window.location.href = "impressoras-lista.html";
      });

      // Limpa tudo
      document.getElementById("limpar").addEventListener("click", () => {
        MenuDados.limparFiltros("filtrosImpressoras");
        form.reset();
        form.dispatchEvent(new Event("limpo"));
      });
