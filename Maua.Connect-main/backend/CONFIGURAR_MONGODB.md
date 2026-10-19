# Configurar MongoDB Atlas no Mauá.Connect

Este backend usa o MongoDB Atlas para armazenar as impressoras. O Azure Cosmos DB foi removido do código e das dependências. O cadastro e login de usuários ficam temporariamente sem persistência e devem ser conectados ao MySQL pela equipe responsável.

## 1. Atlas

1. No Atlas, abra `Cluster0` e use `Connect` para conferir/criar um Database User.
2. Em `Network Access`, autorize o IP público atual do computador. Evite `0.0.0.0/0` fora de testes controlados.
3. Copie a URI de conexão do cluster. Use a senha do Database User (não a senha de login do site) e substitua o banco ao final por `maua_connect`.
4. Se a senha incluir caracteres reservados de URL (`@`, `#`, `/`, `:` etc.), faça URL-encoding desses caracteres.

## 2. Arquivo `.env`

1. Copie `backend/.env.example` para `backend/.env`.
2. Preencha a linha `MONGODB_URI` com sua URI real.
3. Não compartilhe o arquivo `.env` e não faça commit dele. O `.gitignore` ignora esse arquivo.

O Spring Boot não lê `.env` automaticamente. No PowerShell, abra o terminal na pasta `backend` e carregue a variável para a sessão atual com:

```powershell
$env:MONGODB_URI = (Get-Content .env | Where-Object { $_ -match '^MONGODB_URI=' } | Select-Object -First 1) -replace '^MONGODB_URI=', ''
```

Confira sem exibir a URI/senha:

```powershell
if ($env:MONGODB_URI) { "MONGODB_URI configurada" } else { "MONGODB_URI não encontrada" }
```

## 3. Executar

Ainda no diretório `backend`, execute:

```powershell
.\mvnw.cmd spring-boot:run
```

O backend usa a porta `8082`. A variável `MONGODB_URI` precisa estar configurada na mesma janela de terminal em que o comando é executado.

## 4. Endpoint de impressoras

- `POST http://localhost:8082/subindoTeste/maquinas`: valida e salva uma impressora.
- `GET http://localhost:8082/subindoTeste/maquinas`: lista impressoras.
- `GET http://localhost:8082/subindoTeste/maquinas/{id}`: consulta por ID.
- `PUT http://localhost:8082/subindoTeste/maquinas/{id}`: atualiza uma impressora.

A collection `impressoras` é criada automaticamente pelo MongoDB quando o primeiro documento é salvo, se ainda não existir. O banco lógico configurado na URI é `maua_connect`.

## 5. Cadastro/login de usuários

As classes e dependências específicas do Cosmos DB foram removidas. Os endpoints `/api/entrada/login` e `/api/entrada/cadastro` respondem temporariamente `501 Not Implemented` (e validação de senha divergente retorna `400`), até a equipe responsável implementar a persistência no MySQL. Esses endpoints ainda não salvam usuários.

## Segurança

- Não coloque a URI no frontend nem a compartilhe publicamente.
- Não envie senha, chave ou URI completa em prints.
- A associação de uma impressora ao usuário autenticado ainda deve ser integrada ao login/MySQL; por enquanto, o módulo de impressoras não deve confiar em um proprietário fornecido livremente pelo navegador.
