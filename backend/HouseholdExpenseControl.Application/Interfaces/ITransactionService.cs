using HouseholdExpenseControl.Application.Common;
using HouseholdExpenseControl.Application.DTOs.Transaction;

namespace HouseholdExpenseControl.Application.Interfaces;

public interface ITransactionService
{
    Task<Result<TransactionDto>> GetByIdAsync(Guid id);
    Task<Result<IEnumerable<TransactionDto>>> GetAllAsync();
    Task<Result<TransactionDto>> CreateAsync(CreateTransactionDto dto);
}
