import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { Table } from '../components/shared/table/Table';
import { Pagination } from '../components/shared/Pagination';
import { CategoryCreateModal } from '../components/categories/CategoryCreateModal';
import { useCategoryList, useCategoryCreate } from '../hooks/useCategory';
import type { CreateCategoryInput } from '../types/Category';

const PURPOSE_LABELS: Record<number, string> = {
  1: 'Despesa',
  2: 'Receita',
  3: 'Ambos',
};

export function CategoriesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, isLoading, isError, error } = useCategoryList(currentPage, 5);
  const createMutation = useCategoryCreate();

  const currentCategories = data?.items ?? [];
  const isSubmitting = createMutation.isPending;

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message ?? 'Erro ao carregar categorias.');
    }
  }, [isError, error]);

  const handleAddCategory = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSubmit = async (data: CreateCategoryInput) => {
    await createMutation.mutateAsync(data);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Categorias</h1>
        <p className="text-gray-600">Gerencie as categorias de receitas e despesas</p>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <Plus size={20} />
          Adicionar Categoria
        </button>
      </div>

      {isLoading && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center text-gray-500">
          Carregando...
        </div>
      )}

      {isError && (
        <div className="bg-white rounded-lg shadow-md border border-red-200 p-8 text-center text-red-600">
          {error?.message ?? 'Erro ao carregar categorias.'}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-x-auto border border-gray-200">
            <Table.Container className="w-full min-w-[500px]">
              <Table.Header>
                <Table.Row className="hover:bg-gray-100">
                  <Table.Head>ID</Table.Head>
                  <Table.Head>Descrição</Table.Head>
                  <Table.Head>Finalidade</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {currentCategories.length === 0 ? (
                  <Table.Row>
                    <Table.Data colSpan={3} className="text-center py-8 text-gray-500">
                      Nenhuma categoria cadastrada.
                    </Table.Data>
                  </Table.Row>
                ) : (
                  currentCategories.map((category) => (
                    <Table.Row key={category.id}>
                      <Table.Data>{category.id}</Table.Data>
                      <Table.Data>{category.description}</Table.Data>
                      <Table.Data>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${category.purpose === 2
                            ? 'bg-green-100 text-green-800'
                            : category.purpose === 1
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                            }`}
                        >
                          {PURPOSE_LABELS[category.purpose] ?? category.purpose}
                        </span>
                      </Table.Data>
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

      <CategoryCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
