using HouseholdExpenseControl.Domain.Exceptions;

namespace HouseholdExpenseControl.Domain.Entities
{
    // Representa uma pessoa no sistema com suas informações básicas
    public class Person
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }

        // Cria uma pessoa validando todas as regras de negócio
        public Person(Guid id, string name, int age)
        {
            Id = id;

            if (string.IsNullOrEmpty(name))
            {
                throw new DomainException("Nome não pode ser vazio");
            }
            if (name.Length > 200)
            {
                throw new DomainException("Nome não pode ter mais de 200 caracteres");
            }

            Name = name;

            if (age < 0)
            {
                throw new DomainException("Idade não pode ser menor que 0");
            }
            if (age > 130)
            {
                throw new DomainException("Idade não pode ser maior que 130");
            }
            Age = age;
        }

        // Cria uma nova pessoa gerando automaticamente o ID
        public static Person Create(string name, int age)
        {
            return new Person(Guid.NewGuid(), name, age);
        }

        // Atualiza o nome validando as regras
        public void UpdateName(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new DomainException("Nome não pode ser vazio");
            }
            if (name.Length > 200)
            {
                throw new DomainException("Nome não pode ter mais de 200 caracteres");
            }
            Name = name;
        }

        // Atualiza a idade validando as regras
        public void UpdateAge(int age)
        {
            if (age < 0)
            {
                throw new DomainException("Idade não pode ser menor que 0");
            }
            if (age > 130)
            {
                throw new DomainException("Idade não pode ser maior que 130");
            }
            Age = age;
        }
    }
}