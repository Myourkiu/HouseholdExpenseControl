import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../shared/Modal';
import { transactionFormSchema, type TransactionFormValues } from '@/utils/schemas/transaction';
import type { CreateTransactionInput } from '@/types/Transaction';
import type { Category } from '@/types/Category';
import type { Person } from '@/types/Person';

interface TransactionCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTransactionInput) => void | Promise<void>;
  categories: Category[];
  persons: Person[];
  isSubmitting: boolean;
}

export function TransactionCreateModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
  persons,
  isSubmitting,
}: TransactionCreateModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      description: '',
      value: 0,
      type: '' as unknown as number,
      categoryId: '',
      personId: '',
    },
  });

  const categoryId = watch('categoryId');

  // seleciona a categoria baseado no id
  const selectedCategory = categories.find((c) => c.id === categoryId);

  // verifica se o tipo de transação está bloqueado pela finalidade da categoria
  const isTypeLockedByCategory =
    selectedCategory?.purpose === 1 || selectedCategory?.purpose === 2;

  // label do tipo de transação baseado na finalidade da categoria
  const lockedTypeLabel =
    selectedCategory?.purpose === 1 ? 'Despesa' : selectedCategory?.purpose === 2 ? 'Receita' : null;

  // reset o form quando o modal é aberto
  useEffect(() => {
    if (isOpen) {
      reset({
        description: '',
        value: 0,
        type: '' as unknown as number,
        categoryId: '',
        personId: '',
      });
    }
  }, [isOpen, reset]);

  // seleciona o tipo de transação baseado na finalidade da categoria
  useEffect(() => {
    if (!selectedCategory) return;
    if (selectedCategory.purpose === 1) setValue('type', 1);
    if (selectedCategory.purpose === 2) setValue('type', 2);
  }, [selectedCategory, setValue]);

  // handler do submit do form
  const handleValidSubmit = (data: TransactionFormValues) => {
    onSubmit({
      description: data.description,
      value: data.value,
      type: data.type as CreateTransactionInput['type'],
      categoryId: data.categoryId,
      personId: data.personId,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(handleValidSubmit)(e)}
      title="Adicionar Transação"
      submitLabel="Criar"
      isSubmitting={isSubmitting}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="create-description" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <input
            id="create-description"
            type="text"
            {...register('description')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            placeholder="Ex: Mercado"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="create-value" className="block text-sm font-medium text-gray-700 mb-1">
            Valor
          </label>
          <input
            id="create-value"
            type="number"
            step="0.01"
            {...register('value')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.value ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
          />
          {errors.value && (
            <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="create-category" className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <select
            id="create-category"
            {...register('categoryId')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.categoryId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
          >
            <option value="" disabled>Selecione</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.description}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="create-type" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          {isTypeLockedByCategory ? (
            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
              {lockedTypeLabel}
            </div>
          ) : (
            <select
              id="create-type"
              {...register('type')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.type ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            >
              <option value="" disabled>Selecione</option>
              <option value={1}>Despesa</option>
              <option value={2}>Receita</option>
            </select>
          )}
        </div>
        <div>
          <label htmlFor="create-person" className="block text-sm font-medium text-gray-700 mb-1">
            Pessoa
          </label>
          <select
            id="create-person"
            {...register('personId')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.personId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
          >
            <option value="" disabled>Selecione</option>
            {persons.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.personId && (
            <p className="mt-1 text-sm text-red-600">{errors.personId.message}</p>
          )}
        </div>
      </div>
    </Modal>
  );
}
