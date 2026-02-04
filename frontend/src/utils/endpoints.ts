export const endpoints = {
  persons: {
    getPaged: (page: number, pageSize: number) => `/Persons?page=${page}&pageSize=${pageSize}`,
    getById: (id: string) => `/Persons/${id}`,
    create: () => `/Persons`,
    update: (id: string) => `/Persons/${id}`,
    delete: (id: string) => `/Persons/${id}`,
  },
  categories: {
    getPaged: (page: number, pageSize: number) => `/Categories?page=${page}&pageSize=${pageSize}`,
    getById: (id: string) => `/Categories/${id}`,
    create: () => `/Categories`,
  },
  transactions: {
    getPaged: (page: number, pageSize: number) => `/Transactions?page=${page}&pageSize=${pageSize}`,
    getById: (id: string) => `/Transactions/${id}`,
    create: () => `/Transactions`,
  },
  totals: {
    getPersonTotals: () => `/Totals/Persons`,
    getCategoryTotals: () => `/Totals/Categories`,
  },
};