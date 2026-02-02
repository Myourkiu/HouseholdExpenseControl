namespace HouseholdExpenseControl.Application.DTOs.Person;

public record GeneralTotalsDto(
    decimal TotalIncome,
    decimal TotalExpense,
    decimal NetBalance);
