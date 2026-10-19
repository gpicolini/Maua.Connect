# Fluxo das Branches
- `main`: versão principal e estável.
- `develop`: onde juntamos as funcionalidades.
- `feature/...`: branch usada para desenvolver uma tarefa.


Entao na logica sera 

---> feature (voce faz sua parte) ---> develop (junta as nossas partes) ---> main (manda pra ultima versao estavel do projeto)


## Antes de começar a programar 
```bash
git switch develop
git pull origin develop
git switch -c feature/nome-da-tarefa


---

## DEPOIS DE TERMINAR
git status
git add .
git commit -m "feat: descreva a tarefa"
git push -u origin feature/nome-da-tarefa


---
 

 ## NO GIT HUB
Depois isso vai para o git hub em pull request... ai teremos 
feature/sua-tarefa → develop


## Regras
Nunca programar diretamente na main.
Nunca programar diretamente na develop.
Uma tarefa por branch.
A develop só vai para a main por Pull Request.
Se der conflito, pergunte antes de mexer.