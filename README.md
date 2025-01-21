# Projeto: Simulador IR

## Descrição

Este projeto é uma aplicação desenvolvida para simular o preenchimento da declaração do imposto de renda. Ele foi criado utlizando Nest JS, Docker, React, Next JS, Tailwind.

## Rotas

Abaixo estão listadas as rotas da aplicação:

### Rota: `/auth/sign-up`

- **Método:** POST
- **Descrição:** Realiza a registro do usuário.
- **Parâmetros:**
  - `email` (string): Email do usuário.
  - `name` (string): Nome do usuário.
  - `password` (string): Senha do usuário.
- **Resposta:**

  - `201 Created`: Retorna se o usuário foi criado com sucesso.

  ### Rota: `/auth/sign-in`

- **Método:** POST
- **Descrição:** Realiza login do usuário.
- **Parâmetros:**
  - `email` (string): Email do usuário.
  - `password` (string): Senha do usuário.
- **Resposta:**

  - `200 OK`: Retorna o token de autenticação.

  ### Rota: `/auth/delete/:id`

  - **Método:** DELETE
  - **Descrição:** Deleta o usuário especificado.
  - **Parâmetros:**
    - `userId` (string): ID do usuário a ser deletado.
  - **Resposta:**
    - `200 OK`: Usuário deletado com sucesso.
    - `404 Not Found`: Usuário não encontrado.

  ### Rota: `/taxes/create`

- **Método:** POST
- **Descrição:** Cria um novo registro de declaração para um usuário.
- **Parâmetros:**
  - `user_id` (number): ID do usuário.
  - `year` (number): Ano para o qual o imposto está sendo calculado.
  - `salary` (number): Salário do usuário para o ano.
  - `dependents` (number): Número de dependentes do usuário.
  - `health_expenses` (number): Despesas de saúde do usuário para o ano.
  - `education_expenses` (number): Despesas de educação do usuário para o ano.
  - `irrf` (number): Quantidade de IRRF (Imposto de Renda Retido na Fonte) já paga pelo usuário.
- **Resposta:**

  - `201 CREATED`: Mensagem de sucesso com o registro de declaração criada.
  - `400 Bad Request`: Solicitação inválida se algum parâmetro obrigatório estiver faltando ou for inválido.

  ### Rota: `/taxes/all/:id`

- **Método:** GET
- **Descrição:** Retorna todos os registros de declaração de um usuário especificado.
- **Parâmetros:**
  - `userId` (string): ID do usuário cujos registros de declaração serão retornados.
- **Resposta:**

  - `200 OK`: Lista de registros de declaração do usuário.
  - `404 Not Found`: Usuário não encontrado ou sem registros de declaração.

  ### Rota: `/taxes/find/:id`

  - **Método:** GET
  - **Descrição:** Retorna as informações do declaração para o ID de declaração especificada.
  - **Parâmetros:**
    - `id` (number): ID da declaração a ser recuperado.
  - **Resposta:**

    - `200 OK`: Um objeto contendo os detalhes da declaração.

    ### Rota: `/taxes/update/:id`

    - **Método:** PUT
    - **Descrição:** Atualiza as informações de um registro de declaração.
    - **Parâmetros:**
      - `id` (number): ID da declaração a ser atualizado.
      - `salary` (number): Salário do usuário para o ano.
      - `dependents` (number): Número de dependentes do usuário.
      - `health_expenses` (number): Despesas de saúde do usuário para o ano.
      - `education_expenses` (number): Despesas de educação do usuário para o ano.
      - `irrf` (number): Quantidade de IRRF (Imposto de Renda Retido na Fonte) já paga pelo usuário.
    - **Resposta:**
      - `200 OK`: Mensagem de sucesso com o registro de declaração atualizado.
      - `404 Not Found`: Declaração não encontrada.

    ### Rota: `/taxes/delete/:id`

    - **Método:** DELETE
    - **Descrição:** Deleta o registro de declaração especificado.
    - **Parâmetros:**
      - `id` (number): ID da declaração a ser deletado.
    - **Resposta:**
      - `200 OK`: Declaração deletada com sucesso.
      - `404 Not Found`: Declaração não encontrada.

## Requisitos

1. Recomendo criar um .env no diretório apps/backend seguindo o padrão do .env.example.

## Uso

Para instalar e configurar o projeto, siga os passos abaixo:

1. Clone o repositório:
   ```sh
   git clone [https://github.com/Jpecamargo/simulador-ir.git]
   ```
2. Navegue até o diretório do projeto:
   ```sh
   cd docker
   ```
3. Subir o projeto:
   ```sh
   docker-compose up
   ```

## Considerações

/_
Este foi meu primeiro projeto utilizando Nest JS e Docker, qualquer feedback é bem vindo e ajuda no meu crescimento profissional.
_/
