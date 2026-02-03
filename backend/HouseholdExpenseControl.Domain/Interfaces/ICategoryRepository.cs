using HouseholdExpenseControl.Domain.Entities;

namespace HouseholdExpenseControl.Domain.Interfaces;

public interface ICategoryRepository
{
    Task<Category?> GetByIdAsync(Guid id);
    Task<IEnumerable<Category>> GetAllAsync();
    Task<IEnumerable<Category>> GetPagedAsync(int page, int pageSize);
    Task<int> CountAsync();
    Task<Category> AddAsync(Category category);
    Task<bool> ExistsAsync(Guid id);
}
