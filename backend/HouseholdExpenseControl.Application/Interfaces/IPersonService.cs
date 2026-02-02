using HouseholdExpenseControl.Application.Common;
using HouseholdExpenseControl.Application.DTOs.Person;

namespace HouseholdExpenseControl.Application.Interfaces;

public interface IPersonService
{
    Task<Result<PersonDto>> GetByIdAsync(Guid id);
    Task<Result<IEnumerable<PersonDto>>> GetAllAsync();
    Task<Result<PersonDto>> CreateAsync(CreatePersonDto dto);
    Task<Result<PersonDto>> UpdateAsync(Guid id, UpdatePersonDto dto);
    Task<Result> DeleteAsync(Guid id);
}
