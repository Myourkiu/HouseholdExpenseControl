# Documentação do Frontend

## Visão Geral

Interface web do sistema de gerenciamento de gastos residenciais. Desenvolvida em React com TypeScript, consome a API do backend e oferece telas para cadastro de pessoas, categorias e transações, além de consulta de totais.

## Tecnologias

- React 19
- TypeScript
- Vite 7
- React Router 7
- TanStack Query (React Query)
- React Hook Form com Zod
- Axios
- Tailwind CSS 4
- Lucide React (ícones)
- React Hot Toast (notificações)

## Estrutura do Projeto

O código está organizado em `src` com pastas por responsabilidade:

### pages

Telas principais da aplicação, uma por rota.

- PeoplePage: listagem paginada de pessoas com criação, edição e exclusão
- CategoriesPage: listagem paginada de categorias com criação
- TransactionsPage: listagem paginada de transações com criação
- TotalsPage: relatório de totais por pessoa e totais gerais

### components

Componentes reutilizáveis agrupados por contexto.

Header: navegação principal com links para as quatro seções.

shared:

- Modal: modal genérico com título, conteúdo, botões de enviar e cancelar; usado por todos os modais de formulário e confirmação
- Pagination: controles de página anterior e próxima com indicação de página atual e total
- table: conjunto de componentes para tabelas (Container, Header, Row, Head, Data, Body, Action)

people:

- PersonCreateModal: formulário de criação de pessoa com validação
- PersonEditModal: formulário de edição de pessoa
- PersonDeleteModal: confirmação de exclusão de pessoa

categories:

- CategoryCreateModal: formulário de criação de categoria com validação

transactions:

- TransactionCreateModal: formulário de criação de transação com validação; o tipo (despesa/receita) é bloqueado ou liberado conforme a finalidade da categoria selecionada

### hooks

Hooks que encapsulam acesso a dados e mutações via React Query.

- usePerson: listagem paginada, criação, atualização, exclusão e busca por ID de pessoas
- useCategory: listagem paginada e criação de categorias
- useTransaction: listagem paginada e criação de transações
- useTotals: relatório de totais por pessoa; há suporte a totais por categoria na API mas a tela atual exibe apenas totais por pessoa

### services

Chamadas HTTP à API, centralizadas em um cliente Axios configurado em `api.ts`.

- api: instância do Axios com baseURL, timeout e interceptor de resposta que extrai a mensagem de erro do formato retornado pelo backend
- person.service: funções que chamam os endpoints de pessoas
- category.service: funções que chamam os endpoints de categorias
- transaction.service: funções que chamam os endpoints de transações
- totals.service: funções que chamam os endpoints de totais

Os endpoints são definidos em `utils/endpoints.ts` para manter as URLs em um único lugar.

### types

Definições TypeScript dos dados usados na aplicação.

- Person, Category, Transaction, Totals: tipos alinhados aos DTOs da API
- shared/PaginatedResponse: tipo genérico para respostas paginadas

### utils

Funções e configurações auxiliares.

- endpoints: objeto com as rotas da API por recurso
- formatters: formatação de valores (por exemplo moeda)
- schemas: schemas Zod usados na validação de formulários (person, category, transaction)

## Funcionalidades Principais

### Pessoas

Listagem com paginação, botão para adicionar pessoa e ações por linha para editar e excluir. Modais de criação e edição validam nome (obrigatório) e idade (0 a 130). Modal de exclusão pede confirmação antes de chamar a API.

### Categorias

Listagem com paginação e botão para adicionar categoria. Modal de criação valida descrição e finalidade (despesa, receita ou ambos).

### Transações

Listagem com paginação e botão para adicionar transação. Modal de criação valida descrição, valor, categoria, tipo e pessoa. Quando a categoria tem finalidade apenas despesa ou apenas receita, o campo tipo fica bloqueado e exibe o valor correspondente; quando a categoria é "ambos", o usuário escolhe despesa ou receita. Todos os selects iniciam com a opção "Selecione" desabilitada para obrigar a escolha explícita.

### Totais

Exibe os totais gerais (receitas, despesas e saldo) e uma tabela com totais por pessoa. Não há paginação; os dados vêm do endpoint de totais por pessoa.

## Padrões Utilizados

### Hooks de dados

Cada recurso (pessoa, categoria, transação, totais) possui um hook que usa React Query para buscar e invalidar dados. As mutações (criar, editar, excluir) invalidam as queries necessárias para atualizar a lista na tela.

### Modal genérico

Um único componente Modal recebe título, filhos, labels dos botões e callbacks. Os modais de formulário e de confirmação reutilizam esse componente e tratam submit e fechamento internamente.

### Validação de formulários

Formulários usam React Hook Form com zodResolver e schemas Zod. Os schemas ficam em `utils/schemas` e garantem que os dados enviados para a API estejam válidos; mensagens de erro são exibidas abaixo dos campos.

### Tratamento de erros da API

O interceptor do Axios lê o corpo de erro no formato `{ error: { code, message } }` e rejeita a promise com um `Error` cuja mensagem é a do backend. As páginas e mutações exibem essa mensagem via toast quando ocorre falha.

### Consistência de loading e erro

Todas as páginas seguem o mesmo padrão: título e descrição sempre visíveis; em seguida um bloco condicional para estado de carregamento, outro para erro e um terceiro para o conteúdo quando não está carregando e não há erro. Um useEffect dispara toast de erro quando `isError` é verdadeiro, além da mensagem exibida na própria tela.

## Rotas

- `/` redireciona para `/pessoa`
- `/pessoa` lista e gerencia pessoas
- `/categoria` lista e gerencia categorias
- `/transacao` lista e gerencia transações
- `/total` exibe relatório de totais

O Header contém links para essas quatro seções.

## Configuração e Execução

### Variável de ambiente

A URL base da API é definida por `VITE_API_URL`. Se não estiver definida, o cliente usa `http://localhost:5030/api`. 

PS: O .env.local foi removido do gitignore propositalmente para fim de facilitar o teste local.

```
VITE_API_URL=http://localhost:5030/api
```

### Instalação e execução

Para instalar dependências:

```
npm install
```

Para rodar em modo de desenvolvimento:

```
npm run dev
```

A aplicação estará disponível em http://localhost:5173.