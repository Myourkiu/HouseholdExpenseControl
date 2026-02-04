import { PaginatedResponse } from "@/types/shared/PaginatedResponse";
import api from "./api";
import { Person } from "@/types/Person";
import { endpoints } from "@/utils/endpoints";

export const getPagedPersons = async (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<Person>> => {
  const response = await api.get<PaginatedResponse<Person>>(
    endpoints.persons.getPaged(page, pageSize)
  );
  return response.data;
};

export const getPersonById = async (id: string): Promise<Person> => {
  const response = await api.get<Person>(endpoints.persons.getById(id));
  return response.data;
};

export const createPerson = async (person: Person): Promise<Person> => {
  const response = await api.post<Person>(endpoints.persons.create(), person);
  return response.data;
};

export const updatePerson = async (
  id: string,
  person: Person
): Promise<Person> => {
  const response = await api.put<Person>(endpoints.persons.update(id), person);
  return response.data;
};

export const deletePerson = async (id: string): Promise<void> => {
  await api.delete(endpoints.persons.delete(id));
};
