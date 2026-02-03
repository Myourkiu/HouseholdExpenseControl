using HouseholdExpenseControl.Application.Common;
using HouseholdExpenseControl.Application.DTOs.Transaction;

namespace HouseholdExpenseControl.Application.Interfaces;

public interface ITransactionService
{
    Task<Result<TransactionDto>> GetByIdAsync(Guid id);
    Task<Result<PaginatedResponse<TransactionDto>>> GetAllAsync(int page, int pageSize);
    Task<Result<TransactionDto>> CreateAsync(CreateTransactionDto dto);
}
