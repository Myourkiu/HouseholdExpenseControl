namespace HouseholdExpenseControl.Application.DTOs.Person;

public record PersonTotalsReportDto(
    IEnumerable<PersonTotalsDto> Persons,
    GeneralTotalsDto GeneralTotals);
