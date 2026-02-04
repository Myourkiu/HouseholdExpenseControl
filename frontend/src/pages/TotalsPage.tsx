import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Table } from '../components/shared/table/Table';
import { usePersonTotalsReport } from '../hooks/useTotals';
import { formatCurrency } from '@/utils/formatters';

export function TotalsPage() {
  const { data, isLoading, isError, error } = usePersonTotalsReport();

  // handler de erro
  useEffect(() => {
    if (isError && error) {
      toast.error(error.message ?? 'Erro ao carregar totais.');
    }
  }, [isError, error]);

  const persons = data?.persons ?? [];
  const generalTotals = data?.generalTotals;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Consulta de Totais</h1>
        <p className="text-gray-600">Visualize os totais de receitas, despesas e saldo por pessoa</p>
      </div>

      {isLoading && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center text-gray-500">
          Carregando...
        </div>
      )}

      {isError && (
        <div className="bg-white rounded-lg shadow-md border border-red-200 p-8 text-center text-red-600">
          {error?.message ?? 'Erro ao carregar totais.'}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {generalTotals && (
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Total de Receitas</div>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(generalTotals.totalIncome)}
                </div>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Total de Despesas</div>
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(generalTotals.totalExpense)}
                </div>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Saldo Líquido</div>
                <div
                  className={`text-2xl font-bold ${generalTotals.netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  {formatCurrency(generalTotals.netBalance)}
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md overflow-x-auto border border-gray-200">
            <Table.Container className="w-full min-w-[700px]">
              <Table.Header>
                <Table.Row className="hover:bg-gray-100">
                  <Table.Head>ID</Table.Head>
                  <Table.Head>Nome</Table.Head>
                  <Table.Head>Total Receitas</Table.Head>
                  <Table.Head>Total Despesas</Table.Head>
                  <Table.Head>Saldo</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {persons.length === 0 ? (
                  <Table.Row>
                    <Table.Data colSpan={5} className="text-center py-8 text-gray-500">
                      Nenhum total disponível.
                    </Table.Data>
                  </Table.Row>
                ) : (
                  persons.map((total) => (
                    <Table.Row key={total.id}>
                      <Table.Data>{total.id}</Table.Data>
                      <Table.Data>{total.name}</Table.Data>
                      <Table.Data>
                        <span>{formatCurrency(total.totalIncome)}</span>
                      </Table.Data>
                      <Table.Data>
                        <span>{formatCurrency(total.totalExpense)}</span>
                      </Table.Data>
                      <Table.Data>
                        <span>{formatCurrency(total.balance)}</span>
                      </Table.Data>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Container>
          </div>
        </>
      )}
    </div>
  );
}
