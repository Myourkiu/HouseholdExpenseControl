import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../shared/Modal';
import { categoryFormSchema, type CategoryFormValues } from '@/utils/schemas/category';
import type { CreateCategoryInput } from '@/types/Category';

interface CategoryCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCategoryInput) => void | Promise<void>;
  isSubmitting: boolean;
}

export function CategoryCreateModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: CategoryCreateModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { description: '', purpose: '' as unknown as number },
  });

  // reset o form quando o modal é aberto
  useEffect(() => {
    if (isOpen) {
      reset({ description: '', purpose: '' as unknown as number });
    }
  }, [isOpen, reset]);

  // handler do submit do form
  const handleValidSubmit = (data: CategoryFormValues) => {
    onSubmit({
      description: data.description,
      purpose: data.purpose as CreateCategoryInput['purpose'],
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(handleValidSubmit)(e)}
      title="Adicionar Categoria"
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
            placeholder="Ex: Alimentação"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="create-purpose" className="block text-sm font-medium text-gray-700 mb-1">
            Finalidade
          </label>
          <select
            id="create-purpose"
            {...register('purpose')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.purpose ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
          >
            <option value="" disabled>Selecione</option>
            <option value={1}>Despesa</option>
            <option value={2}>Receita</option>
            <option value={3}>Ambos</option>
          </select>
          {errors.purpose && (
            <p className="mt-1 text-sm text-red-600">{errors.purpose.message}</p>
          )}
        </div>
      </div>
    </Modal>
  );
}
