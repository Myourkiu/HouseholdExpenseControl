using HouseholdExpenseControl.Domain.Entities;

namespace HouseholdExpenseControl.Domain.Interfaces;

public interface ITransactionRepository
{
    Task<Transaction?> GetByIdAsync(Guid id);
    Task<IEnumerable<Transaction>> GetAllAsync();
    Task<IEnumerable<Transaction>> GetPagedAsync(int page, int pageSize);
    Task<int> CountAsync();
    Task<Transaction> AddAsync(Transaction transaction);
    Task<bool> ExistsAsync(Guid id);
}
