import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { Table } from '../components/shared/table/Table';
import { Pagination } from '../components/shared/Pagination';
import { TransactionCreateModal } from '../components/transactions/TransactionCreateModal';
import { useTransactionList, useTransactionCreate } from '../hooks/useTransaction';
import { useCategoryList } from '../hooks/useCategory';
import { usePersonList } from '../hooks/usePerson';
import type { CreateTransactionInput } from '../types/Transaction';
import { formatCurrency } from '@/utils/formatters';

export function TransactionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, isLoading, isError, error } = useTransactionList(currentPage, 5);
  const { data: categoriesData } = useCategoryList(1, 200);
  const { data: personsData } = usePersonList(1, 200);
  const createMutation = useTransactionCreate();

  const currentTransactions = data?.items ?? [];
  const categories = categoriesData?.items ?? [];
  const persons = personsData?.items ?? [];
  const isSubmitting = createMutation.isPending;

  // handler de erro
  useEffect(() => {
    if (isError && error) {
      toast.error(error.message ?? 'Erro ao carregar transações.');
    }
  }, [isError, error]);

  // handlers de ações
  const handleAddTransaction = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSubmit = async (data: CreateTransactionInput) => {
    await createMutation.mutateAsync(data);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Transações</h1>
        <p className="text-gray-600">Gerencie todas as transações financeiras</p>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={handleAddTransaction}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <Plus size={20} />
          Adicionar Transação
        </button>
      </div>

      {isLoading && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center text-gray-500">
          Carregando...
        </div>
      )}

      {isError && (
        <div className="bg-white rounded-lg shadow-md border border-red-200 p-8 text-center text-red-600">
          {error?.message ?? 'Erro ao carregar transações.'}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-x-auto border border-gray-200">
            <Table.Container className="w-full min-w-[700px]">
              <Table.Header>
                <Table.Row className="hover:bg-gray-100">
                  <Table.Head>ID</Table.Head>
                  <Table.Head>Descrição</Table.Head>
                  <Table.Head>Valor</Table.Head>
                  <Table.Head>Tipo</Table.Head>
                  <Table.Head>Categoria</Table.Head>
                  <Table.Head>Pessoa</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {currentTransactions.length === 0 ? (
                  <Table.Row>
                    <Table.Data colSpan={6} className="text-center py-8 text-gray-500">
                      Nenhuma transação cadastrada.
                    </Table.Data>
                  </Table.Row>
                ) : (
                  currentTransactions.map((transaction) => (
                    <Table.Row key={transaction.id}>
                      <Table.Data>{transaction.id}</Table.Data>
                      <Table.Data>{transaction.description}</Table.Data>
                      <Table.Data>
                        <span>
                          {formatCurrency(transaction.value)}
                        </span>
                      </Table.Data>
                      <Table.Data>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${transaction.type === 2 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {transaction.type === 2 ? 'Receita' : 'Despesa'}
                        </span>
                      </Table.Data>
                      <Table.Data>{transaction.category.description}</Table.Data>
                      <Table.Data>{transaction.person.name}</Table.Data>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Container>
          </div>

          {data && data.totalPages > 0 && (
            <Pagination
              page={data.page}
              totalPages={data.totalPages}
              hasNextPage={data.hasNextPage}
              hasPreviousPage={data.hasPreviousPage}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      <TransactionCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
        categories={categories}
        persons={persons}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
