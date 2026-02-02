using HouseholdExpenseControl.Application.Common;
using HouseholdExpenseControl.Application.DTOs.Category;
using HouseholdExpenseControl.Application.Interfaces;
using HouseholdExpenseControl.Domain.Entities;
using HouseholdExpenseControl.Domain.Exceptions;
using HouseholdExpenseControl.Domain.Interfaces;

namespace HouseholdExpenseControl.Application.UseCases;

// Gerencia as operações de negócio relacionadas a categorias
public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    // Busca uma categoria pelo ID retornando erro se não encontrar
    public async Task<Result<CategoryDto>> GetByIdAsync(Guid id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);

        if (category == null)
            return Result.Failure<CategoryDto>(Error.NotFound);

        var dto = new CategoryDto(category.Id, category.Description, category.Purpose);
        return Result.Success(dto);
    }

    // Retorna todas as categorias cadastradas
    public async Task<Result<IEnumerable<CategoryDto>>> GetAllAsync()
    {
        var categories = await _categoryRepository.GetAllAsync();
        var dtos = categories.Select(c => new CategoryDto(c.Id, c.Description, c.Purpose));
        return Result.Success(dtos);
    }

    // Cria uma nova categoria validando as regras de negócio
    public async Task<Result<CategoryDto>> CreateAsync(CreateCategoryDto dto)
    {
        try
        {
            var category = Category.Create(dto.Description, dto.Purpose);
            var created = await _categoryRepository.AddAsync(category);
            var result = new CategoryDto(created.Id, created.Description, created.Purpose);
            return Result.Success(result);
        }
        catch (DomainException ex)
        {
            return Result.Failure<CategoryDto>(new Error("Error.BadRequest", ex.Message));
        }
    }
}
