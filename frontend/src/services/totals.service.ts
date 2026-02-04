import api from "./api";
import type {
  PersonTotalsReportDto,
  CategoryTotalsReportDto,
} from "@/types/Totals";
import { endpoints } from "@/utils/endpoints";

export const getPersonTotalsReport =
  async (): Promise<PersonTotalsReportDto> => {
    const response = await api.get<PersonTotalsReportDto>(
      endpoints.totals.getPersonTotals()
    );
    return response.data;
  };

export const getCategoryTotalsReport =
  async (): Promise<CategoryTotalsReportDto> => {
    const response = await api.get<CategoryTotalsReportDto>(
      endpoints.totals.getCategoryTotals()
    );
    return response.data;
  };
