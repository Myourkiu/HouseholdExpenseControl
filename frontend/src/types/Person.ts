export interface Person {
  id: string;
  name: string;
  age: number;
}

export type CreatePersonInput = Pick<Person, "name" | "age">;
export type UpdatePersonInput = Pick<Person, "name" | "age">;