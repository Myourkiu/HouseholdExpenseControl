import { ReactNode, TableHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

const TableRow = ({ children, ...rest }: TableRowProps) => {
  return (
    <tr {...rest} className={twMerge("text-center border-b border-gray-200 hover:bg-gray-50 transition-colors", rest.className)}>{children}</tr>
  )
}

export default TableRow