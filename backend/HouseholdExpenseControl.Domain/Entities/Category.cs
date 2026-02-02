using HouseholdExpenseControl.Domain.Enums;
using HouseholdExpenseControl.Domain.Exceptions;

namespace HouseholdExpenseControl.Domain.Entities;

// Representa uma categoria que classifica transações como despesa, receita ou ambas
public class Category
{
    public Guid Id { get; private set; }
    public string Description { get; private set; }
    public CategoryPurpose Purpose { get; private set; }

    // Cria uma categoria validando a descrição e finalidade
    public Category(Guid id, string description, CategoryPurpose purpose)
    {
        Id = id;

        if (string.IsNullOrWhiteSpace(description))
        {
            throw new DomainException("Descrição não pode ser vazia");
        }
        
        if (description.Length > 400)
        {
            throw new DomainException("Descrição não pode ter mais de 400 caracteres");
        }

        Description = description;

        if (!Enum.IsDefined(typeof(CategoryPurpose), purpose))
        {
            throw new DomainException("Finalidade inválida");
        }

        Purpose = purpose;
    }

    // Cria uma nova categoria gerando automaticamente o ID
    public static Category Create(string description, CategoryPurpose purpose)
    {
        return new Category(Guid.NewGuid(), description, purpose);
    }
}
