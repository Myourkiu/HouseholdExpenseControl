using HouseholdExpenseControl.Application.Common;
using HouseholdExpenseControl.Application.DTOs.Category;

namespace HouseholdExpenseControl.Application.Interfaces;

public interface ICategoryService
{
    Task<Result<CategoryDto>> GetByIdAsync(Guid id);
    Task<Result<IEnumerable<CategoryDto>>> GetAllAsync();
    Task<Result<CategoryDto>> CreateAsync(CreateCategoryDto dto);
}
