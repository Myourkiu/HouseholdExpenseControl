namespace HouseholdExpenseControl.Application.DTOs.Person;

public record PersonTotalsDto(
    Guid Id,
    string Name,
    decimal TotalIncome,
    decimal TotalExpense,
    decimal Balance);
