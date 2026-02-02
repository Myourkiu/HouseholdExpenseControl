# Documentação do Sistema

## Visão Geral

Sistema de gerenciamento de gastos residenciais desenvolvido em .NET 9 seguindo princípios de Clean Architecture.

## Tecnologias

- .NET 9
- PostgreSQL 15
- Entity Framework Core 9
- Swagger/Swashbuckle

## Estrutura do Projeto

O projeto está organizado em uma única solution com pastas representando as camadas:

### HouseholdExpenseControl.Domain
Camada de domínio contendo as regras de negócio e entidades.

Entities:
- Person: representa uma pessoa com nome e idade
- Category: representa uma categoria de transação com descrição e finalidade
- Transaction: representa uma movimentação financeira

ValueObjects:
- Money: garante que valores monetários sejam sempre positivos

Enums:
- CategoryPurpose: define se a categoria é para despesa, receita ou ambas
- TransactionType: define se a transação é despesa ou receita

### HouseholdExpenseControl.Application
Camada de aplicação contendo a lógica de casos de uso.

UseCases:
- PersonService: gerencia operações de pessoas
- CategoryService: gerencia operações de categorias
- TransactionService: gerencia operações de transações com validações de regras de negócio
- TotalsService: gera relatórios de totais por pessoa e por categoria

Common:
- Result: padrão para retorno de operações com sucesso ou falha
- Error: representa erros com código e mensagem

### HouseholdExpenseControl.Infrastructure
Camada de infraestrutura contendo acesso a dados.

Data:
- AppDbContext: contexto do Entity Framework para acesso ao banco

Repositories:
- PersonRepository: implementa operações de banco para Person
- CategoryRepository: implementa operações de banco para Category
- TransactionRepository: implementa operações de banco para Transaction

### HouseholdExpenseControl.API
Camada de apresentação contendo os endpoints da API.

Controllers:
- PersonsController: endpoints CRUD de pessoas
- CategoriesController: endpoints CRUD de categorias
- TransactionsController: endpoints CRUD de transações
- TotalsController: endpoints de relatórios

Configuration:
- DependencyInjection: centraliza o registro de dependências

## Funcionalidades Principais

### Cadastro de Pessoas
Gerencia pessoas com validações de nome e idade. Menores de 18 anos têm restrições em transações de receita.

### Cadastro de Categorias
Gerencia categorias que podem ser de despesa, receita ou ambas. Categorias com finalidade específica só aceitam transações compatíveis.

### Cadastro de Transações
Gerencia movimentações financeiras validando:
- Categoria compatível com tipo de transação
- Idade da pessoa para transações de receita
- Valor sempre positivo através do ValueObject Money

### Relatórios de Totais
Gera relatórios consolidados mostrando:
- Total de receitas, despesas e saldo por pessoa
- Total de receitas, despesas e saldo por categoria
- Totais gerais do sistema

## Padrões Utilizados

### Result Pattern
Todas as operações retornam um objeto Result indicando sucesso ou falha, evitando uso excessivo de exceções para controle de fluxo.

### Repository Pattern
Abstração do acesso a dados através de interfaces, facilitando testes e manutenção.

### Factory Method
Entidades possuem método estático Create para encapsular a geração de ID e criação.

### Value Object
Money garante que valores monetários sempre sejam válidos e positivos.

## Regras de Negócio

### Pessoa
- Nome obrigatório com máximo 200 caracteres
- Idade entre 0 e 130 anos
- Menores de 18 anos não podem fazer transações de receita

### Categoria
- Descrição obrigatória com máximo 400 caracteres
- Finalidade define compatibilidade com tipos de transação

### Transação
- Descrição obrigatória com máximo 400 caracteres
- Valor deve ser positivo
- Categoria deve ser compatível com o tipo
- Pessoa deve ter idade adequada para o tipo
- Deletar pessoa deleta suas transações automaticamente
- Deletar categoria é bloqueado se houver transações

## Endpoints Disponíveis

### Persons
- GET /api/persons - lista todas as pessoas
- GET /api/persons/{id} - busca pessoa por ID
- POST /api/persons - cria nova pessoa
- PUT /api/persons/{id} - atualiza pessoa
- DELETE /api/persons/{id} - deleta pessoa

### Categories
- GET /api/categories - lista todas as categorias
- GET /api/categories/{id} - busca categoria por ID
- POST /api/categories - cria nova categoria

### Transactions
- GET /api/transactions - lista todas as transações
- GET /api/transactions/{id} - busca transação por ID
- POST /api/transactions - cria nova transação

### Totals
- GET /api/totals/persons - relatório de totais por pessoa
- GET /api/totals/categories - relatório de totais por categoria

## Configuração e Execução

### Banco de Dados
O sistema usa PostgreSQL via Docker Compose. Para iniciar:

```
docker-compose up -d
```

Configuração do banco:
- Host: localhost
- Porta: 5432
- Database: householdexpensecontrol
- Usuário: postgres
- Senha: postgres

### Aplicação
Para executar a aplicação:

```
dotnet run
```

A aplicação estará disponível em http://localhost:5030.

## Formato de Respostas

### Sucesso
Retorna diretamente os dados:
```json
{
  "id": "guid",
  "name": "Nome"
}
```

### Erro
Retorna objeto error com código e mensagem:
```json
{
  "error": {
    "code": "Error.NotFound",
    "message": "Recurso não encontrado"
  }
}
```