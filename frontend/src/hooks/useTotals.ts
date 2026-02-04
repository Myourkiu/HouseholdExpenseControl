import { useQuery } from "@tanstack/react-query";
import {
  getPersonTotalsReport,
  getCategoryTotalsReport,
} from "@/services/totals.service";

const totalsKeys = {
  personReport: ["totals", "persons"] as const,
  categoryReport: ["totals", "categories"] as const,
};

export function usePersonTotalsReport() {
  return useQuery({
    queryKey: totalsKeys.personReport,
    queryFn: getPersonTotalsReport,
  });
}

export function useCategoryTotalsReport() {
  return useQuery({
    queryKey: totalsKeys.categoryReport,
    queryFn: getCategoryTotalsReport,
  });
}

export { totalsKeys };
