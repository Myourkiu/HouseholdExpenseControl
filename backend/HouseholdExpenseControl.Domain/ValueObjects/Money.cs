using HouseholdExpenseControl.Domain.Exceptions;

namespace HouseholdExpenseControl.Domain.ValueObjects;

// Representa um valor monetário garantindo que sempre seja positivo
public class Money
{
    public decimal Amount { get; private set; }

    // Cria um valor monetário validando que seja maior que zero
    public Money(decimal amount)
    {
        if (amount <= 0)
        {
            throw new DomainException("Valor deve ser positivo");
        }

        Amount = amount;
    }

    // Permite converter Money para decimal automaticamente
    public static implicit operator decimal(Money money) => money.Amount;
    
    // Permite converter decimal para Money automaticamente
    public static implicit operator Money(decimal amount) => new Money(amount);

    // Compara dois valores monetários
    public override bool Equals(object? obj)
    {
        if (obj is Money other)
            return Amount == other.Amount;
        return false;
    }

    public override int GetHashCode() => Amount.GetHashCode();

    // Formata o valor com duas casas decimais
    public override string ToString() => Amount.ToString("F2");
}
