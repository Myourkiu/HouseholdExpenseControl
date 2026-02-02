namespace HouseholdExpenseControl.Application.DTOs.Category;

public record CategoryTotalsDto(
    Guid Id,
    string Description,
    decimal TotalIncome,
    decimal TotalExpense,
    decimal Balance);
