API de Notificações 🔔
Uma simples API de Notificações construída com Node.js, Express e MongoDB. Esta API permite aos usuários gerenciar notificações, incluindo criar, listar, marcar como lida e deletar.

Funcionalidades ✨
Criar Notificações: Adicionar novas notificações para usuários.

Listar Notificações: Recuperar notificações para um usuário específico com paginação.

Marcar como Lida: Atualizar o status de uma notificação para 'lida'.

Deletar Notificações: Remover notificações do sistema.

Tratamento de Erros Robusto: Middleware centralizado para tratamento de erros.

Validação de Dados: Validação do payload da requisição usando Joi.

Pré-requisitos 🛠️
Antes de começar, certifique-se de ter os seguintes requisitos:

Node.js: Versão 18 ou superior.

npm: Node Package Manager (já vem com o Node.js).

MongoDB: Uma instância do MongoDB em execução (local ou hospedada na nuvem).

Git: Para clonar o repositório.

VS Code (Recomendado): Para desenvolvimento, especialmente se usar o Thunder Client.

Postman ou Thunder Client: Para testar a API.

Primeiros Passos 🚀
Siga estes passos para configurar seu ambiente de desenvolvimento.

1. Clonando o Repositório
Primeiro, clone o repositório do projeto do GitHub para sua máquina local:

Bash

git clone https://github.com/Juholiver/testBackEndConfi
cd testBackEndConfi


2. Instalando as Dependências
Navegue até o diretório do projeto e instale todas as dependências necessárias do Node.js:

Bash

npm install
3. Variáveis de Ambiente
Crie um arquivo .env na raiz do seu projeto baseado no arquivo .env.example. Este arquivo armazenará seus detalhes de configuração sensíveis, como a string de conexão do MongoDB.

Bash

cp .env.example .env
Abra o recém-criado arquivo .env e atualize as variáveis MONGO_URI e DB_NAME com os detalhes da sua conexão MongoDB:

# Conexão MongoDB
MONGO_URI=mongodb://localhost:27017/ # Sua string de conexão MongoDB
DB_NAME=notificationdb # Seu nome de banco de dados desejado

# Configuração do Servidor
PORT=3000
NODE_ENV=development
4. Executando a Aplicação
Você pode iniciar a aplicação em modo de desenvolvimento (com nodemon para reinicializações automáticas) ou em modo de produção:

Modo de Desenvolvimento:

Bash

npm run dev
Modo de Produção:

Bash

npm start
A API geralmente estará em execução em http://localhost:3000 (ou na PORT especificada no seu arquivo .env).

Executando Testes 🧪
O projeto inclui testes unitários para os endpoints e serviços da API. Você também pode testar a API manualmente usando ferramentas como Thunder Client ou Postman.

1. Testes Unitários
Para executar os testes unitários automatizados, use o seguinte comando:

Bash

npm test
Isso executará todos os testes definidos no diretório tests/.

2. Teste de API com Thunder Client (Extensão VS Code)
Thunder Client é um cliente REST API leve integrado diretamente no VS Code.

Instale o Thunder Client:

Abra o VS Code.

Vá para a visualização de Extensões (Ctrl+Shift+X).

Procure por "Thunder Client" e instale-o.

Abra o Thunder Client:

Após a instalação, clique no ícone do Thunder Client (geralmente um raio) na barra de atividades do VS Code.

Crie uma Nova Requisição:

Clique em "New Request".

Configure e Envie as Requisições:

Método: Selecione o método HTTP (GET, POST, PATCH, DELETE).

URL: Digite a URL do endpoint da sua API (ex: http://localhost:3000/notifications).

Headers: Adicione quaisquer headers necessários (ex: Content-Type: application/json).

Body: Para requisições POST/PATCH, selecione "JSON" e forneça o payload JSON.

Clique em "Send" para executar a requisição e visualizar a resposta.

Exemplos de Requisições:

POST /notifications

Método: POST

URL: http://localhost:3000/notifications

Body (JSON):

JSON

{
  "userId": "usuario123",
  "content": "Esta é uma notificação de teste do Thunder Client."
}
Esperado: Status 201 Created, e o objeto da notificação criada.

GET /notifications/user/:userId

Método: GET

URL: http://localhost:3000/notifications/user/usuario123 (substitua usuario123 por um ID de usuário real)

Esperado: Status 200 OK, e uma lista de notificações para esse usuário.

PATCH /notifications/:id/read

Método: PATCH

URL: http://localhost:3000/notifications/<ID_DA_NOTIFICACAO>/read (substitua <ID_DA_NOTIFICACAO> por um _id de uma notificação criada)

Esperado: Status 200 OK, e a notificação atualizada com isRead: true.

DELETE /notifications/:id

Método: DELETE

URL: http://localhost:3000/notifications/<ID_DA_NOTIFICACAO>

Esperado: Status 204 No Content.

3. Teste de API com Postman
Postman é uma aplicação standalone popular para desenvolvimento e teste de API.

Baixe e Instale o Postman:

Se você não tiver o Postman, baixe-o no site oficial do Postman.

Crie uma Nova Requisição:

Abra o Postman.

Clique na aba + para criar uma nova requisição, ou clique em "New" -> "HTTP Request".

Configure e Envie as Requisições:

Method: Selecione o método HTTP (GET, POST, PATCH, DELETE) no menu suspenso.

URL: Digite a URL do endpoint da sua API (ex: http://localhost:3000/notifications).

Headers: Vá para a aba "Headers" e adicione quaisquer headers necessários (ex: Content-Type: application/json).

Body: Para requisições POST/PATCH, vá para a aba "Body", selecione "raw" e depois "JSON" no menu suspenso, e forneça o payload JSON.

Clique em "Send" para executar a requisição e visualizar a resposta no painel inferior.

Exemplos de Requisições (iguais aos exemplos do Thunder Client):

POST /notifications

Método: POST

URL: http://localhost:3000/notifications

Body (raw, JSON):

JSON

{
  "userId": "usuario123",
  "content": "Esta é uma notificação de teste do Postman."
}
Esperado: Status 201 Created, e o objeto da notificação criada.

GET /notifications/user/:userId

Método: GET

URL: http://localhost:3000/notifications/user/usuario123

Esperado: Status 200 OK, e uma lista de notificações.

PATCH /notifications/:id/read

Método: PATCH

URL: http://localhost:3000/notifications/<ID_DA_NOTIFICACAO>/read

Esperado: Status 200 OK, e a notificação atualizada.

DELETE /notifications/:id

Método: DELETE

URL: http://localhost:3000/notifications/<ID_DA_NOTIFICACAO>

Esperado: Status 204 No Content.

Estrutura do Projeto 📂
.
├── .env.example
├── jest.config.js
├── package.json
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── database.js # Configuração do Banco de Dados
│   ├── controllers/
│   │   └── notificationController.js # Lógica de Requisição/Resposta
│   ├── middlewares/
│   │   └── errorHandler.js # Tratamento de Erros
│   ├── models/
│   │   └── Notification.js # Schema do Mongoose
│   ├── routes/
│   │   └── notificationRoutes.js # Definição das Rotas
│   └── services/
│       └── notificationService.js # Lógica de Negócios
└── tests/
    └── notifications.test.js # Testes Unitários
