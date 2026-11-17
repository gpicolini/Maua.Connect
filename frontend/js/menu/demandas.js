// Preenche a largura das barras com base nos números
      const ids = ["pendente", "producao", "concluida", "cancelada"];
      const total = ids.reduce(
        (soma, id) =>
          soma + Number(document.getElementById("qtd-" + id).textContent),
        0,
      );
      document.getElementById("total").textContent = total;
      ids.forEach((id) => {
        const qtd = Number(document.getElementById("qtd-" + id).textContent);
        document.getElementById("barra-" + id).style.width =
          (total ? (qtd / total) * 100 : 0) + "%";
      });
