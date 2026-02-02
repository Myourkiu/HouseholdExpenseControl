using HouseholdExpenseControl.Domain.Enums;
using HouseholdExpenseControl.Domain.Exceptions;
using HouseholdExpenseControl.Domain.ValueObjects;

namespace HouseholdExpenseControl.Domain.Entities;

// Representa uma movimentação financeira de uma pessoa em uma categoria específica
public class Transaction
{
    public Guid Id { get; private set; }
    public string Description { get; private set; }
    public Money Value { get; private set; }
    public TransactionType Type { get; private set; }
    public Guid CategoryId { get; private set; }
    public Category Category { get; private set; } = null!;
    public Guid PersonId { get; private set; }
    public Person Person { get; private set; } = null!;

    // Construtor necessário para o Entity Framework
    private Transaction()
    {
        Description = string.Empty;
        Value = new Money(1);
    }

    // Cria uma transação validando as informações básicas
    public Transaction(
        Guid id,
        string description,
        Money value,
        TransactionType type,
        Guid categoryId,
        Guid personId)
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
        Value = value;

        if (!Enum.IsDefined(typeof(TransactionType), type))
        {
            throw new DomainException("Tipo de transação inválido");
        }

        Type = type;
        CategoryId = categoryId;
        PersonId = personId;
    }

    // Verifica se a categoria pode ser usada para este tipo de transação
    public void ValidateCategoryPurpose(CategoryPurpose categoryPurpose)
    {
        var isValid = categoryPurpose switch
        {
            CategoryPurpose.Both => true,
            CategoryPurpose.Expense when Type == TransactionType.Expense => true,
            CategoryPurpose.Income when Type == TransactionType.Income => true,
            _ => false
        };

        if (!isValid)
        {
            throw new DomainException(
                $"Categoria com finalidade '{categoryPurpose}' não pode ser utilizada para transação do tipo '{Type}'");
        }
    }

    // Verifica se a pessoa pode fazer este tipo de transação baseado na idade
    public void ValidatePersonAge(int personAge)
    {
        if (personAge < 18 && Type == TransactionType.Income)
        {
            throw new DomainException("Menores de idade não podem realizar transações de receita");
        }
    }

    // Cria uma nova transação gerando automaticamente o ID
    public static Transaction Create(
        string description,
        Money value,
        TransactionType type,
        Guid categoryId,
        Guid personId)
    {
        return new Transaction(Guid.NewGuid(), description, value, type, categoryId, personId);
    }
}
