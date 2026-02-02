using HouseholdExpenseControl.Domain.Enums;

namespace HouseholdExpenseControl.Application.DTOs.Transaction;

public record CreateTransactionDto(
    string Description,
    decimal Value,
    TransactionType Type,
    Guid CategoryId,
    Guid PersonId);
