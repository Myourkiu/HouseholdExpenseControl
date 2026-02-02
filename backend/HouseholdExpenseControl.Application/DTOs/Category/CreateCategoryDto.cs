using HouseholdExpenseControl.Domain.Enums;

namespace HouseholdExpenseControl.Application.DTOs.Category;

public record CreateCategoryDto(string Description, CategoryPurpose Purpose);
