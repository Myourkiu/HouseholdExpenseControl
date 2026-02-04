using HouseholdExpenseControl.Application.Common;
using HouseholdExpenseControl.Application.DTOs.Category;

namespace HouseholdExpenseControl.Application.Interfaces;

public interface ICategoryService
{
    Task<Result<CategoryDto>> GetByIdAsync(Guid id);
    Task<Result<PaginatedResponse<CategoryDto>>> GetAllAsync(int page, int pageSize);
    Task<Result<CategoryDto>> CreateAsync(CreateCategoryDto dto);
}
