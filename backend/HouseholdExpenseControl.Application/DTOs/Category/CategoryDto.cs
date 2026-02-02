using HouseholdExpenseControl.Domain.Enums;

namespace HouseholdExpenseControl.Application.DTOs.Category;

public record CategoryDto(Guid Id, string Description, CategoryPurpose Purpose);
