aq eh os comandos do git rpzd..
lembrem que voces digitam isso aqui no terminal, tanto cmd e de prefêrencia o powershell, pq ele é mais novo


## 1. Atualize o projeto
git switch develop
git pull origin develop


## 2. Crie sua branch
git switch -c feature/nome-da-tarefa

Exemplo:

git switch -c feature/tela-login


## 3. Depois de terminar
git status
git add .
git commit -m "feat: adiciona tela de login"
git push -u origin feature/nome-da-tarefa


## 4. No GitHub
Abra um Pull Request para a `develop` e espere alguém revisar.


## Regras
- Nunca programar na `main`.
- Nunca programar na `develop`.
- Uma tarefa por branch.
- Não subir `.env`, senha ou token (aqui ficam os arquivos comprometedores do projeto).
- Se aparecer conflito ou mensagem estranha: pergunta no grupo.