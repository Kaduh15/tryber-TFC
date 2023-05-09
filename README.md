# Trybe-futebol-clube


## Sobre o projeto

O TFC é um site informativo sobre partidas e classificações de futebol.

Desenvolvido uma API consumindo um banco de dados, utilizando principios SOLID e arquitetura MSC com TypeScript, POO e dockerização(dockerfile, docker-compose). Utilizando modelagem de dados através do Sequelize, onde tem a finalidade de ser consumida por um front-end, já construído pelo time da trybe nesse projeto, a API é responsavel por:

* Criar e manipular dados com MySQL através do Sequelize, armazenando os dados;
* Autenticação de usuário;
* Listar clubs cadastrados;
* Listar partidas em andamento e finalizados;
* Criar novas partidas;
* Atualizar placar em partidas em andamento;
* Finalizar partidas em andamento;
* Gerar um leaderboard de time de fora e time de casa, e de modo geral, utilizando ordenação avaliativos de critérios para o placar;
* Realizando a dockerização do back-end e front-end, utilizando docker-compose;

## Tecnologias utilizadas

* NodeJs
* Express
* Programação orientação a objetos
* TypeScript
* Mocha, Chai e Sinon
* Sequelize
* MYSQL
* Docker

## Bibliotecas utilizadas

* Joi
* Bcrypt
* Jwt

## Para ser feito a instalação do projeto em sua máquina

É necessário ter [docker](https://docs.docker.com/get-docker/) e [docker-compose](https://docs.docker.com/compose/install/)

1. Clone o repositório
```bash
  git clone git@github.com:Fedolfo/Trybe-futebol-clube.git
```
2. Entre no arquivo
```bash
  cd Trybe-futebol-clube
```
3. Suba os containêrs
```bash
  npm run compose:up ou docker-compose up -d --build
```
4. No momento que subir os container retornara essa messagem no terminal
```bash
  Creating db ... done
  Creating app_backend_1 ... done
  Creating app_frontend_1 ... done
```
5. Para acessar as aplicação
```bash
  front-end: localhost:3000
  back-end: localhost:3001
```
  Para a realização do login no front-end:
```bash
  login: admin@admin.com
  senha: secret_admin
```
6. Para rodar os testes de integração, caso estiver na raiz do projeto
```bash
  cd app && docker-compose exec backend npm test
```
7. Para remover a API
```bash
  docker-compose down --rmi local --volumes --remove-orphans
```
