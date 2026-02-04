import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../shared/Modal';
import { personFormSchema, type PersonFormValues } from '@/utils/schemas/person';
import type { CreatePersonInput } from '@/types/Person';

interface PersonCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePersonInput) => void | Promise<void>;
  isSubmitting: boolean;
}

export function PersonCreateModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: PersonCreateModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonFormValues>({
    resolver: zodResolver(personFormSchema),
    defaultValues: { name: '', age: 0 },
  });

  // reset o form quando o modal é aberto
  useEffect(() => {
    if (isOpen) {
      reset({ name: '', age: 0 });
    }
  }, [isOpen, reset]);

  // handler do submit do form
  const handleValidSubmit = (data: PersonFormValues) => {
    onSubmit({ name: data.name, age: data.age });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(handleValidSubmit)(e)}
      title="Adicionar Pessoa"
      submitLabel="Criar"
      isSubmitting={isSubmitting}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="create-name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            id="create-name"
            type="text"
            {...register('name')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            placeholder="Digite o nome"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="create-age" className="block text-sm font-medium text-gray-700 mb-1">
            Idade
          </label>
          <input
            id="create-age"
            type="number"
            {...register('age')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.age ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            placeholder="Digite a idade"
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>
      </div>
    </Modal>
  );
}
