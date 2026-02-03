using HouseholdExpenseControl.Application.Common;
using HouseholdExpenseControl.Application.DTOs.Person;

namespace HouseholdExpenseControl.Application.Interfaces;

public interface IPersonService
{
    Task<Result<PersonDto>> GetByIdAsync(Guid id);
    Task<Result<PaginatedResponse<PersonDto>>> GetAllAsync(int page, int pageSize);
    Task<Result<PersonDto>> CreateAsync(CreatePersonDto dto);
    Task<Result<PersonDto>> UpdateAsync(Guid id, UpdatePersonDto dto);
    Task<Result> DeleteAsync(Guid id);
}
