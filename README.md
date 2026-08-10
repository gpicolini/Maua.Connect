# Repositório do PI
Esse é o Repositório certo do git, qualquer coisa pergunta no grupo


## O que estamos fazendo? - Vou explicar aq.. 

Existem universidades, laboratórios e FabLabs (sei la oq eh isso) com impressoras 3D que nem sempre estão sendo utilizadas.

Ao mesmo tempo, existe uma demanda real por fabricação de próteses e outros dispositivos relacionados à tecnologia assistiva que eh isso aqui (Tecnologia Assistiva é o uso de produtos, equipamentos e soluções que ajudam pessoas com deficiência ou mobilidade reduzida a terem mais autonomia, independência e qualidade de vida..)

O objetivo é desenvolver uma plataforma capaz de conectar esses dois lados.

A AACD disponibiliza uma demanda de fabricação e o sistema procura, dentro da rede cadastrada, uma estrutura de impressão 3D que seja compatível, homologada e esteja disponível para produzir aquela peça.


# O que eh a AACD 

A AACD é uma instituição voltada à reabilitação e assistência de pessoas com deficiência física.

Dentro deste projeto, ela é uma das principais responsáveis por apresentar as necessidades de fabricação e fornecer os arquivos e padrões necessários para a produção das peças.

A ideia da nossa plataforma é ajudar a conectar essas demandas com universidades, laboratórios e FabLabs que possuam impressoras 3D compatíveis e disponíveis.

De forma simples:

AACD → gera a demanda  
A gente → encontra uma estrutura compatível  
Laboratório/FabLab → realiza a produção  
AACD → participa da validação e controle de qualidade


Em resumo:

AACD precisa fabricar algo
        ↓
A demanda entra na plataforma (a gente)
        ↓
O sistema procura uma impressora compatível
        ↓
Encontra uma unidade disponível e homologada
        ↓
A peça entra no processo de produção
        ↓
Controle de qualidade
        ↓
AACD

---


## O que a gente tem que fazer:

Construir uma plataforma web que permita:

- cadastrar usuários e instituições;
- cadastrar e gerenciar impressoras 3D;
- consultar a disponibilidade dos equipamentos;
- registrar demandas de fabricação;
- identificar equipamentos compatíveis com cada demanda;
- realizar o matchmaking entre demanda e capacidade de produção;
- acompanhar o ciclo de produção;
- manter um histórico das solicitações;
- organizar as informações necessárias para homologação e controle de qualidade.

---


##  Como fica o que cada um faz

A gente vai dividir o projeto, na maioria do tempo, assim:


### Front-end - Gui, Pattaro, Surdo e Ulliana

Tudo que os usuários vão utilizar diretamente.

Exemplos:

- login;
- dashboard;
- cadastro de equipamentos;
- cadastro de demandas;
- acompanhamento dos pedidos;
- visualização das impressoras disponíveis.


### Back-end - Gab e Cabeça

Responsável pelas regras do sistema.

Exemplos:

- autenticação;
- gerenciamento dos usuários;
- gerenciamento das demandas;
- gerenciamento das impressoras;
- validações;
- comunicação com o banco;
- lógica de matchmaking.


### Banco de Dados - Todo Mundo

Onde vamos guardar as informações do sistema.

Algumas entidades que provavelmente teremos:

- usuários;
- instituições;
- impressoras;
- materiais;
- demandas;
- produções;
- status;
- homologações.

Essa estrutura ainda pode mudar conforme entendermos melhor o problema.


### Matchmaking - Todo mundo

O sistema deverá conseguir comparar uma demanda com as impressoras disponíveis.

Por exemplo:

Demanda
├── material necessário
├── prioridade
├── requisitos técnicos
└── localização

Impressora
├── materiais suportados
├── disponibilidade
├── especificações
├── localização
└── homologação

                 ↓

           MATCHING

                 ↓

       Melhor opção disponível

A lógica exata ainda será definida pelo grupo durante o desenvolvimento.

---

Git — termos básicos - Pfv, leiam isso aqui.. pra ninguém fazer merda

### git Branch
Uma `branch` é uma linha separada de desenvolvimento.

Serve para trabalhar em uma funcionalidade sem alterar diretamente o código principal.

Exemplo:

`feature/login`

`feature/dashboard`

`feature/cadastro-impressora`

---

### git Commit
Um `commit` salva uma alteração no histórico do projeto.

Exemplo:

`git commit -m "feat: adiciona tela de login"`

---

### git Push
O `push` envia seus commits para o GitHub.

Exemplo:

`git push origin feature/login`

---

### git Pull
O `pull` baixa as alterações mais recentes do repositório.

Exemplo:

`git pull origin develop`

---

### git Merge
O `merge` junta o conteúdo de duas branches.

Exemplo:

`feature/login` → `develop`

---

### git Pull Request
É um pedido para juntar sua branch com outra.

Normalmente usamos para revisar o código antes de fazer o merge.

---

### git Revert
O `revert` desfaz as alterações de um commit sem apagar o histórico.

Exemplo:

`git revert <id-do-commit>`

---
Exemplo aqui:
cria sua branch
git add .
git commit -m "Tela de Login ta feita"
git push
ai vai cair no pull request (alguém confere se tá tudo certo, ou se ninguém fez coisa por cima.. ai pronto)
E pronto, ele sobe aqui no git hub

---


## Git e organização

Não deem git, direito na main, pq pode dar merda.. quando for trabalhar, da git branch.. pq ai vc meio que cria uma segunda linha do código.. depois que tudo tiver pronto, vc junta essa segunda linha com a primeira. Assim ninguém faz merda.

`main`
→ versão estável do projeto.

`develop`
→ integração do que estamos desenvolvendo.

Cada tarefa pode ter sua própria branch:

feature/login

feature/cadastro-impressora

feature/dashboard

feature/matchmaking

fix/nome-do-problema

Fluxo básico:

1. Atualiza a `develop`;
2. cria sua branch;
3. desenvolve;
4. faz commit;
5. push;
6. abre Pull Request;
7. alguém do grupo revisa;
8. merge na `develop`.

---

## Commits

Não precisa escrever uma redação.

Só tentem deixar claro o que aconteceu.

feat: adiciona tela de login

feat: cria cadastro de impressoras

fix: corrige validação do formulário

docs: atualiza README

refactor: reorganiza serviço de usuários

---


Projeto desenvolvido por:

- Miguel Ulliana
- Gabriel Picolini
- Gabriel Buranello
- Guilherme Picolini
- Vitor Pattaro
- Pedro Henrique Toniolo
