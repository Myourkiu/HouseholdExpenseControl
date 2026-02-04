import { ReactNode, TableHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableHeadProps extends TableHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

const TableHead = ({
  children,
  ...rest
}: TableHeadProps) => {
  return (
    <th
      {...rest}
      className={twMerge(
        'py-3 px-4 text-gray-700 font-semibold select-none text-sm uppercase tracking-wide text-center',
        rest.className,
      )}
    >
      <span className="inline-flex items-center gap-1">
        {children}
      </span>
    </th>
  );
};

export default TableHead;
