import { X } from 'lucide-react';
import { FormEvent, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  title: string;
  children: ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  isDelete?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  submitLabel = 'Salvar',
  cancelLabel = 'Cancelar',
  isSubmitting = false,
  isDelete = false,
}: ModalProps) {
  if (!isOpen) return null;

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit && !isSubmitting) {
      onSubmit(e);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isSubmitting}
            >
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleFormSubmit} className="flex flex-col flex-1 overflow-hidden">
            <div className="p-6 overflow-y-auto flex-1">
              {children}
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className='bg-transparent text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium'
                disabled={isSubmitting}
              >
                {cancelLabel}
              </button>
              <button
                type="submit"
                className={isDelete ? 'bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:bg-red-400 disabled:cursor-not-allowed' : 'bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-400 disabled:cursor-not-allowed'}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Salvando...' : submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div></div>
  );
}
