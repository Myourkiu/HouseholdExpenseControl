import { ReactNode, TableHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
    children: ReactNode;
  }

const TableContainer = ({children, ...rest} : TableProps) => {
  return (
    <table className={twMerge("w-full", rest.className)}>{children}</table>
  )
}

export default TableContainer