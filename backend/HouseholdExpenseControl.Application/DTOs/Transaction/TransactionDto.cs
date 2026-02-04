using HouseholdExpenseControl.Application.DTOs.Category;
using HouseholdExpenseControl.Application.DTOs.Person;
using HouseholdExpenseControl.Domain.Enums;

namespace HouseholdExpenseControl.Application.DTOs.Transaction;

public record TransactionDto(
    Guid Id,
    string Description,
    decimal Value,
    TransactionType Type,
    CategoryDto Category,
    PersonDto Person);
