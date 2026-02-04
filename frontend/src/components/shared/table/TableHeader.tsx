import { ReactNode, TableHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableHeaderProps extends TableHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

const TableHeader = ({ children, ...rest }: TableHeaderProps) => {
  return (
    <thead
      className={twMerge(
        'bg-gray-100 border-b-2 border-gray-200',
        rest.className,
      )}
    >
      {children}
    </thead>
  );
};

export default TableHeader;
