## O que é Git?

Git salva o histórico do projeto.

Ele permite que cada pessoa trabalhe separadamente sem alterar imediatamente o código dos outros.


---


## Como nosso projeto está organizado?

- `main`: versão principal e estável.
- `develop`: versão onde juntamos as funcionalidades em desenvolvimento.
- `feature/...`: branch criada para trabalhar em uma tarefa.

Exemplo:

feature/tela-login

O caminho normal é:

feature → develop → main

Nunca programe diretamente na `main` ou na `develop`.


---


# Primeira vez no projeto

## 1. Clonar o repositório

git clone https://github.com/gpicolini/Maua-Hub-3D---PI.git

O `clone` baixa uma cópia do projeto para o seu computador.

Depois, entre na pasta:

cd Maua-Hub-3D---PI


---


# Antes de começar uma tarefa

## 2. Ir para a develop

git switch develop

O `switch` troca a branch em que você está trabalhando.


---


## 3. Atualizar o projeto

git pull origin develop

O `pull` baixa as alterações mais recentes da `develop`.

Faça isso antes de criar sua branch para não começar com uma versão antiga.


---


## 4. Criar sua branch

git switch -c feature/nome-da-tarefa

O `-c` cria uma branch nova e já entra nela.

Exemplo:

git switch -c feature/tela-login

Use nomes simples:

- feature/tela-login
- feature/cadastro-impressora
- feature/dashboard
- fix/correcao-menu


---

# Depois de programar


## 5. Ver o que foi alterado
git status

O `status` mostra:

- arquivos alterados;
- arquivos novos;
- arquivos preparados para o commit;
- branch atual.

Sempre confira o `status` antes de continuar.


---


## 6. Preparar os arquivos
git add .

O `add` prepara as alterações para entrarem no próximo commit.

O ponto significa “todos os arquivos alterados desta pasta”.

Confira novamente:

git status


---


## 7. Criar o commit
git commit -m "feat: adiciona tela de login"

O `commit` salva um ponto no histórico do projeto.

A mensagem deve explicar o que foi feito.

Exemplos:

git commit -m "feat: adiciona cadastro de impressora"
git commit -m "fix: corrige validação do formulário"
git commit -m "docs: atualiza instruções do Git"


---


## 8. Enviar sua branch
git push -u origin feature/nome-da-tarefa

O `push` envia sua branch e seus commits para o GitHub.

Exemplo:

git push -u origin feature/tela-login

Depois do primeiro push, os próximos podem ser somente:

git push


---


# Pull Request
Depois do `push`, entre no GitHub e abra um Pull Request:

feature/sua-tarefa → develop

O Pull Request é um pedido para colocar suas alterações na `develop`.

Outra pessoa deve conferir o código antes do merge.

## O que é merge?

O `merge` junta o conteúdo de uma branch com outra.

No nosso projeto, o merge será feito depois da aprovação do Pull Request.


---


# Resumo
Sempre siga esta ordem:

1. Ir para a develop.
2. Atualizar a develop.
3. Criar uma branch.
4. Programar.
5. Conferir as alterações.
6. Criar um commit.
7. Enviar a branch.
8. Abrir um Pull Request.

Comandos:
git switch develop
git pull origin develop
git switch -c feature/nome-da-tarefa

git status
git add .
git commit -m "feat: descreva o que fez"
git push -u origin feature/nome-da-tarefa


---


# Regras importantes
- Nunca programar diretamente na `main`.
- Nunca programar diretamente na `develop`.
- Nunca enviar senha, token ou arquivo `.env`.
- Uma branch deve representar uma tarefa.
- Confira a branch atual usando `git status`.
- Não use `force push`.
- Não apague branches de outras pessoas.
- Se aparecer conflito ou mensagem estranha, pare e pergunte no grupo.