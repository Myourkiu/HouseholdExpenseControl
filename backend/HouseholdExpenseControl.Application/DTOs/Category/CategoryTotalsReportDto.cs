using HouseholdExpenseControl.Application.DTOs.Person;

namespace HouseholdExpenseControl.Application.DTOs.Category;

public record CategoryTotalsReportDto(
    IEnumerable<CategoryTotalsDto> Categories,
    GeneralTotalsDto GeneralTotals);
