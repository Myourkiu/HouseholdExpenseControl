import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Table } from '../components/shared/table/Table';
import { Pagination } from '../components/shared/Pagination';
import { PersonCreateModal } from '../components/people/PersonCreateModal';
import { PersonEditModal } from '../components/people/PersonEditModal';
import { PersonDeleteModal } from '../components/people/PersonDeleteModal';
import {
  usePersonList,
  usePersonCreate,
  usePersonUpdate,
  usePersonDelete,
} from '../hooks/usePerson';
import type { CreatePersonInput, Person, UpdatePersonInput } from '../types/Person';

export function PeoplePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [editFormData, setEditFormData] = useState<UpdatePersonInput>({ name: '', age: 0 });

  const { data, isLoading, isError, error } = usePersonList(currentPage, 5);
  const createMutation = usePersonCreate();
  const updateMutation = usePersonUpdate();
  const deleteMutation = usePersonDelete();

  const currentPeople = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;
  const isSubmitting =
    createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  //handlers de ações
  const handleAddPerson = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditPerson = (person: Person) => {
    setSelectedPerson(person);
    setEditFormData({ name: person.name, age: person.age });
    setIsEditModalOpen(true);
  };

  const handleDeletePerson = (person: Person) => {
    setSelectedPerson(person);
    setIsDeleteModalOpen(true);
  };

  const handleCreateSubmit = async (data: CreatePersonInput) => {
    await createMutation.mutateAsync(data);
    setIsCreateModalOpen(false);
  };

  const handleEditSubmit = async (data: UpdatePersonInput) => {
    if (!selectedPerson) return;
    await updateMutation.mutateAsync({ id: selectedPerson.id, data });
    setIsEditModalOpen(false);
  };

  const handleDeleteSubmit = async () => {
    if (!selectedPerson) return;
    await deleteMutation.mutateAsync(selectedPerson.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Pessoas</h1>
        <p className="text-gray-600">Gerencie as pessoas cadastradas no sistema</p>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={handleAddPerson}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <Plus size={20} />
          Adicionar Pessoa
        </button>
      </div>

      {isLoading && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center text-gray-500">
          Carregando...
        </div>
      )}

      {isError && (
        <div className="bg-white rounded-lg shadow-md border border-red-200 p-8 text-center text-red-600">
          {error?.message ?? 'Erro ao carregar pessoas.'}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-x-auto border border-gray-200">
            <Table.Container className="w-full min-w-[500px]">
              <Table.Header>
                <Table.Row className="hover:bg-gray-100">
                  <Table.Head>ID</Table.Head>
                  <Table.Head>Nome</Table.Head>
                  <Table.Head>Idade</Table.Head>
                  <Table.Head className="">Ações</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {currentPeople.length === 0 ? (
                  <Table.Row>
                    <Table.Data colSpan={4} className="py-8 text-gray-500">
                      Nenhuma pessoa cadastrada.
                    </Table.Data>
                  </Table.Row>
                ) : (
                  currentPeople.map((person) => (
                    <Table.Row key={person.id}>
                      <Table.Data>{person.id}</Table.Data>
                      <Table.Data>{person.name}</Table.Data>
                      <Table.Data>{person.age}</Table.Data>
                      <Table.Data>
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditPerson(person)}
                            className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                            title="Editar"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeletePerson(person)}
                            className="text-red-600 hover:text-red-800 transition-colors p-1"
                            title="Deletar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </Table.Data>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Container>
          </div>

          {totalPages > 0 && data && (
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

      <PersonCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
        isSubmitting={isSubmitting}
      />

      <PersonEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialValues={editFormData}
        isSubmitting={isSubmitting}
      />

      <PersonDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSubmit={handleDeleteSubmit}
        personName={selectedPerson?.name ?? ''}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
