using HouseholdExpenseControl.Application.Common;
using HouseholdExpenseControl.Application.DTOs.Category;
using HouseholdExpenseControl.Application.DTOs.Person;
using HouseholdExpenseControl.Application.Interfaces;
using HouseholdExpenseControl.Domain.Enums;
using HouseholdExpenseControl.Domain.Interfaces;

namespace HouseholdExpenseControl.Application.UseCases;

// Gera relatórios consolidados de receitas e despesas
public class TotalsService : ITotalsService
{
    private readonly IPersonRepository _personRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly ITransactionRepository _transactionRepository;

    public TotalsService(
        IPersonRepository personRepository,
        ICategoryRepository categoryRepository,
        ITransactionRepository transactionRepository)
    {
        _personRepository = personRepository;
        _categoryRepository = categoryRepository;
        _transactionRepository = transactionRepository;
    }

    // Calcula os totais de cada pessoa e o total geral do sistema
    public async Task<Result<PersonTotalsReportDto>> GetPersonTotalsReportAsync()
    {
        var persons = await _personRepository.GetAllAsync();
        var allTransactions = await _transactionRepository.GetAllAsync();

        // Para cada pessoa, calcula suas receitas, despesas e saldo
        var personTotals = persons.Select(person =>
        {
            var personTransactions = allTransactions.Where(t => t.PersonId == person.Id).ToList();

            var totalIncome = personTransactions
                .Where(t => t.Type == TransactionType.Income)
                .Sum(t => t.Value.Amount);

            var totalExpense = personTransactions
                .Where(t => t.Type == TransactionType.Expense)
                .Sum(t => t.Value.Amount);

            var balance = totalIncome - totalExpense;

            return new PersonTotalsDto(person.Id, person.Name, totalIncome, totalExpense, balance);
        }).ToList();

        // Soma os totais de todas as pessoas
        var generalTotalIncome = personTotals.Sum(p => p.TotalIncome);
        var generalTotalExpense = personTotals.Sum(p => p.TotalExpense);
        var generalNetBalance = generalTotalIncome - generalTotalExpense;

        var generalTotals = new GeneralTotalsDto(generalTotalIncome, generalTotalExpense, generalNetBalance);

        var report = new PersonTotalsReportDto(personTotals, generalTotals);

        return Result.Success(report);
    }

    // Calcula os totais de cada categoria e o total geral do sistema
    public async Task<Result<CategoryTotalsReportDto>> GetCategoryTotalsReportAsync()
    {
        var categories = await _categoryRepository.GetAllAsync();
        var allTransactions = await _transactionRepository.GetAllAsync();

        // Para cada categoria, calcula suas receitas, despesas e saldo
        var categoryTotals = categories.Select(category =>
        {
            var categoryTransactions = allTransactions.Where(t => t.CategoryId == category.Id).ToList();

            var totalIncome = categoryTransactions
                .Where(t => t.Type == TransactionType.Income)
                .Sum(t => t.Value.Amount);

            var totalExpense = categoryTransactions
                .Where(t => t.Type == TransactionType.Expense)
                .Sum(t => t.Value.Amount);

            var balance = totalIncome - totalExpense;

            return new CategoryTotalsDto(category.Id, category.Description, totalIncome, totalExpense, balance);
        }).ToList();

        // Soma os totais de todas as categorias
        var generalTotalIncome = categoryTotals.Sum(c => c.TotalIncome);
        var generalTotalExpense = categoryTotals.Sum(c => c.TotalExpense);
        var generalNetBalance = generalTotalIncome - generalTotalExpense;

        var generalTotals = new GeneralTotalsDto(generalTotalIncome, generalTotalExpense, generalNetBalance);

        var report = new CategoryTotalsReportDto(categoryTotals, generalTotals);

        return Result.Success(report);
    }
}
