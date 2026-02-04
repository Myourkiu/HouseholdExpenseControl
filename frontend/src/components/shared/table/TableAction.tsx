import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableActionProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    action: () => void,
    children: ReactNode;
}

const TableAction = ({children, action, ...rest} : TableActionProps) => {
  return (
    <button {...rest} onClick={action} className={twMerge("p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1D1B19] transition-colors", rest.className)}>
        {children}
    </button>
  )
}

export default TableAction