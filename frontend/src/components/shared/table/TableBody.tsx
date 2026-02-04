import { ReactNode, TableHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TableBodyProps extends TableHTMLAttributes<HTMLTableElement> {
    children: ReactNode;
  }

const TableBody = ({children, ...rest} : TableBodyProps) => {
  return (
    <tbody className={twMerge("", rest.className)}>{children}</tbody>
  )
}

export default TableBody