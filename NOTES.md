# Notas do Projeto

## Trade-offs

*   **Simplicidade vs. Robustez:** Priorizamos a implementação rápida das funcionalidades essenciais, o que pode ter sacrificado um tratamento de erros mais avançado ou a consideração de casos de uso complexos.
*   **Escolha da Tecnologia:** Optamos por tecnologias familiares (ex: Node.js, Express) para agilizar o desenvolvimento, mesmo que outras pilhas pudessem oferecer ganhos marginais de desempenho em cenários específicos.
*   **Banco de Dados:** Utilizamos uma solução de banco de dados leve para facilitar a configuração e o desenvolvimento. Reconhecemos que uma solução mais robusta pode ser necessária para ambientes de produção.

## Funcionalidades Não Implementadas (Restrições de Tempo)

*   **Autenticação e Autorização de Usuários:** Não há sistema de login ou controle de acesso baseado em funções. Todos os endpoints da API estão atualmente acessíveis publicamente.
*   **Recursos Avançados de Notificação:**
    *   Notificações em tempo real (ex: WebSockets).
    *   Preferências de notificação personalizadas por usuário.
    *   Envio de notificações em lote.
*   **Validação Abrangente de Entradas:** Embora haja validação básica, uma validação mais extensa e granular para todos os campos de entrada poderia ser implementada.
*   **Logging e Monitoramento Detalhados:** Existe um logging básico, mas um sistema mais estruturado com capacidades de monitoramento e alertas está ausente.
*   **Documentação da API:** Não há documentação de API auto-gerada ou abrangente (ex: Swagger/OpenAPI).

## Próximos Passos Sugeridos

*   **Implementar Autenticação e Autorização de Usuários:** Proteger os endpoints da API e gerenciar o acesso dos usuários.
*   **Adicionar Notificações em Tempo Real:** Integrar WebSockets para entrega instantânea de notificações.
*   **Aprimorar a Validação de Entradas:** Desenvolver um esquema de validação robusto para todas as entradas da API.
*   **Melhorar o Tratamento de Erros:** Implementar tipos de erro mais específicos e um mecanismo centralizado para o tratamento de exceções.
*   **Implementar Logging e Monitoramento Completos:** Configurar um sistema de logging (ex: Winston, Pino) e integrá-lo com ferramentas de monitoramento.
*   **Gerar Documentação da API:** Utilizar ferramentas como Swagger/OpenAPI para documentar a API, facilitando seu consumo.
*   **Aumentar a Cobertura de Testes:** Escrever mais testes unitários e de integração para as funcionalidades críticas.
*   **Containerização:** Dockerizar a aplicação para simplificar a implantação e o escalonamento.
*   **Pipeline de CI/CD:** Configurar um pipeline de Integração Contínua e Entrega Contínua.