import { ReactNode, TableHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableDataCellProps extends TableHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  colSpan?: number;
}

const TableDataCell = ({ children, ...rest }: TableDataCellProps) => {
  return (
    <td
      className={twMerge(
        'px-4 py-3 text-gray-800 text-sm text-center',
        rest.className,
      )}
      {...rest}
    >
      {children}
    </td>
  );
};

export default TableDataCell;
