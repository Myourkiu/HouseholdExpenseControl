using HouseholdExpenseControl.Domain.Entities;

namespace HouseholdExpenseControl.Domain.Interfaces;

public interface IPersonRepository
{
    Task<Person?> GetByIdAsync(Guid id);
    Task<IEnumerable<Person>> GetAllAsync();
    Task<IEnumerable<Person>> GetPagedAsync(int page, int pageSize);
    Task<int> CountAsync();
    Task<Person> AddAsync(Person person);
    Task UpdateAsync(Person person);
    Task DeleteAsync(Guid id);
    Task<bool> ExistsAsync(Guid id);
}
