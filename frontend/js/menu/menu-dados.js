// Filtros locais de apresentação. Não armazena usuários nem credenciais.
window.MenuDados = {
 lerFiltros(chave) { try { const valor=JSON.parse(localStorage.getItem(chave)||'{}'); return valor && typeof valor==='object' && !Array.isArray(valor) ? valor : {}; } catch { return {}; } },
 salvarFiltros(chave, valor) { try { localStorage.setItem(chave,valor); } catch { alert('Não foi possível guardar os filtros neste navegador.'); } },
 limparFiltros(chave) { try { localStorage.removeItem(chave); } catch {} },
 mostrarDetalhes(dados) {
  if (!dados) return;
  const rotulos={solicitante:'Solicitante',tipo:'Tipo',titulo:'Descrição',categoria:'Categoria',qtd:'Quantidade',status:'Status',data:'Data',lado:'Lado',nome:'Impressora',local:'Localização',ultima:'Última impressão'};
  const dialog=document.createElement('dialog'); dialog.className='dialogDetalhes'; dialog.setAttribute('aria-label','Detalhes do registro de exemplo');
  const fechar=document.createElement('button'); fechar.type='button'; fechar.textContent='Fechar'; fechar.addEventListener('click',()=>dialog.close()); dialog.append(fechar);
  const titulo=document.createElement('h2'); titulo.textContent='Detalhes — dados de exemplo'; dialog.append(titulo);
  const lista=document.createElement('dl');
  Object.entries(dados).forEach(([chave,valor])=>{const dt=document.createElement('dt');dt.textContent=rotulos[chave]||chave;const dd=document.createElement('dd');dd.textContent=String(valor);lista.append(dt,dd);});
  dialog.append(lista); dialog.addEventListener('close',()=>dialog.remove());document.body.append(dialog);dialog.showModal();
 }
};
