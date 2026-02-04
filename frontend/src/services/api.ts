import axios, { AxiosError } from "axios";

// configuração do axios de baseUrl, timeout e headers
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5030/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
// interceptor de resposta para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (apiError: AxiosError<{ error?: { code?: string; message?: string } }>) => {
    const message =
      apiError.response?.data?.error?.message ??
      apiError.message ??
      "Erro de conexão.";
    return Promise.reject(new Error(message));
  }
);

export default api;
