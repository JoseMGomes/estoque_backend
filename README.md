# Gerenciador de Estoque - Back-end

Este repositório foi criado como parte de um case da **Mind Consulting** com o objetivo de desenvolver um **Gerenciador de Estoque**. A aplicação foi construída utilizando **Node.js**, **TypeScript**, **MySQL** como banco de dados e **Prisma** como ORM.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript do lado do servidor.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
- **Prisma**: ORM para interagir com o banco de dados MySQL de maneira eficiente e fácil.

## Funcionalidades

- API para cadastro, edição e remoção de produtos no estoque.
- API para login de usuários com autenticação baseada em JWT.
- API para cadastro de novos usuários.
- Conexão com o banco de dados MySQL utilizando o Prisma ORM.
- Validação de dados de entrada utilizando bibliotecas como **Yup**.

## Instalação

Para rodar o projeto localmente, siga os passos abaixo:

### 1. Clonar o repositório

```bash
git clone https://github.com/JoseMGomes/estoque_backend.git

cd estoque_backend

npm install

DATABASE_URL="mysql://root:@localhost:3306/estoque?schema=public"

npx prisma migrate dev

npm start


