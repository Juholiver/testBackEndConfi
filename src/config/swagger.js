const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notification API',
      version: '1.0.0',
      description: 'API for managing user notifications.',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Adjust this to your server URL
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Notification: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID da notificação',
              example: '60d5ec49f8c7a1001f8e4d5a',
            },
            userId: {
              type: 'string',
              description: 'ID do usuário',
              example: 'user123',
            },
            content: {
              type: 'string',
              description: 'Conteúdo da notificação',
              example: 'Sua encomenda foi entregue!',
            },
            read: {
              type: 'boolean',
              description: 'Status de leitura da notificação',
              example: false,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação da notificação',
              example: '2023-10-27T10:00:00Z',
            },
          },
          required: ['userId', 'content'],
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Erro interno do servidor',
            },
            details: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: '"userId" is required',
                  },
                  path: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    example: ['userId'],
                  },
                  type: {
                    type: 'string',
                    example: 'any.required',
                  },
                },
              },
              description: 'Detalhes adicionais do erro (ex: erros de validação)',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], // Paths to files containing API documentation
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
