using HouseholdExpenseControl.Application.Common;
using HouseholdExpenseControl.Application.DTOs.Category;
using HouseholdExpenseControl.Application.DTOs.Person;

namespace HouseholdExpenseControl.Application.Interfaces;

public interface ITotalsService
{
    Task<Result<PersonTotalsReportDto>> GetPersonTotalsReportAsync();
    Task<Result<CategoryTotalsReportDto>> GetCategoryTotalsReportAsync();
}
