import { Modal } from '../shared/Modal';

interface PersonDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  personName: string;
  isSubmitting: boolean;
}

export function PersonDeleteModal({
  isOpen,
  onClose,
  onSubmit,
  personName,
  isSubmitting,
}: PersonDeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title="Confirmar Exclusão"
      submitLabel="Deletar"
      isSubmitting={isSubmitting}
      isDelete
    >
      <p className="text-gray-700">
        Tem certeza que deseja deletar <strong>{personName}</strong>?
        Esta ação não pode ser desfeita.
      </p>
    </Modal>
  );
}
