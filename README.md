# Proffy API

API do **Proffy**, uma plataforma para conectar alunos e professores. O projeto fornece a base do backend, incluindo cadastro de usuários, persistência em PostgreSQL e documentação interativa da API.

## Tecnologias

- Node.js e TypeScript
- Fastify
- PostgreSQL
- Drizzle ORM e Drizzle Kit
- Zod
- Docker Compose

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- npm
- [Docker](https://www.docker.com/) e Docker Compose

## Como executar localmente

1. Clone o repositório e entre na pasta do backend.

   ```bash
   git clone <url-do-repositorio>
   cd backend
   ```

2. Instale as dependências.

   ```bash
   npm install
   ```

3. Crie seu arquivo de variáveis de ambiente a partir do exemplo.

   **PowerShell:**

   ```powershell
   Copy-Item .env.example .env
   ```

   **macOS/Linux:**

   ```bash
   cp .env.example .env
   ```

4. Inicie o PostgreSQL com Docker.

   ```bash
   docker compose up -d
   ```

5. Aplique as migrações no banco de dados.

   ```bash
   npm run db:migrate
   ```

6. Inicie a API em modo de desenvolvimento.

   ```bash
   npm run dev
   ```

A aplicação ficará disponível em `http://localhost:3333` e reiniciará automaticamente quando os arquivos TypeScript forem alterados.

## Variáveis de ambiente

Configure o arquivo `.env` com os valores necessários:

```env
COOKIE_SECRET="uma-chave-secreta-para-cookies"
DATABASE_URL="postgres://postgres:postgres@localhost:5432/proffy_database"
NODE_ENV="development"
JWT_TOKEN="uma-chave-secreta-para-tokens"
```

O `DATABASE_URL` acima corresponde ao banco criado pelo `docker-compose.yml`. Em ambientes compartilhados ou de produção, use segredos fortes e não versione o arquivo `.env`.

## Documentação da API

Com o servidor em execução, a documentação interativa OpenAPI pode ser acessada em:

```text
http://localhost:3333/docs
```

## Endpoint disponível

### Criar usuário

`POST /users`

Exemplo de corpo da requisição:

```json
{
  "name": "Maria Silva",
  "email": "maria@example.com",
  "password": "senha-segura",
  "whatsapp": "31999999999"
}
```

Resposta de sucesso (`201 Created`):

```json
{
  "userId": "uuid-do-usuario"
}
```

As senhas são armazenadas com hash usando Argon2.

## Scripts úteis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia a API em desenvolvimento, com recarregamento automático. |
| `npm run db:generate` | Gera migrações Drizzle a partir do schema. |
| `npm run db:migrate` | Executa as migrações pendentes no banco. |
| `npm run db:studio` | Abre o Drizzle Studio para inspecionar o banco. |

## Banco de dados

O schema atual contempla usuários, aulas, horários de aulas e conexões entre usuários. As definições estão em `src/database/schema.ts`, e as migrações geradas ficam na pasta `drizzle/`.
