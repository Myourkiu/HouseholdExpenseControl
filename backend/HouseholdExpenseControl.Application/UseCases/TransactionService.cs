using HouseholdExpenseControl.Application.Common;
using HouseholdExpenseControl.Application.DTOs.Category;
using HouseholdExpenseControl.Application.DTOs.Person;
using HouseholdExpenseControl.Application.DTOs.Transaction;
using HouseholdExpenseControl.Application.Interfaces;
using HouseholdExpenseControl.Domain.Entities;
using HouseholdExpenseControl.Domain.Exceptions;
using HouseholdExpenseControl.Domain.Interfaces;
using HouseholdExpenseControl.Domain.ValueObjects;

namespace HouseholdExpenseControl.Application.UseCases;

// Gerencia as operações de negócio relacionadas a transações
public class TransactionService : ITransactionService
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly IPersonRepository _personRepository;
    private readonly ICategoryRepository _categoryRepository;

    public TransactionService(
        ITransactionRepository transactionRepository,
        IPersonRepository personRepository,
        ICategoryRepository categoryRepository)
    {
        _transactionRepository = transactionRepository;
        _personRepository = personRepository;
        _categoryRepository = categoryRepository;
    }

    // Busca uma transação pelo ID retornando erro se não encontrar
    public async Task<Result<TransactionDto>> GetByIdAsync(Guid id)
    {
        var transaction = await _transactionRepository.GetByIdAsync(id);

        if (transaction == null)
            return Result.Failure<TransactionDto>(Error.NotFound);

        var dto = new TransactionDto(
            transaction.Id,
            transaction.Description,
            transaction.Value.Amount,
            transaction.Type,
            new CategoryDto(transaction.Category.Id, transaction.Category.Description, transaction.Category.Purpose),
            new PersonDto(transaction.Person.Id, transaction.Person.Name, transaction.Person.Age));

        return Result.Success(dto);
    }

    // Busca todas as transações paginadas
    public async Task<Result<PaginatedResponse<TransactionDto>>> GetAllAsync(int page, int pageSize)
    {
        var totalCount = await _transactionRepository.CountAsync();
        var transactions = await _transactionRepository.GetPagedAsync(page, pageSize);
        var dtos = transactions.Select(t => new TransactionDto(
            t.Id,
            t.Description,
            t.Value.Amount,
            t.Type,
            new CategoryDto(t.Category.Id, t.Category.Description, t.Category.Purpose),
            new PersonDto(t.Person.Id, t.Person.Name, t.Person.Age)));
        var response = new PaginatedResponse<TransactionDto>(dtos, page, pageSize, totalCount);
        return Result.Success(response);
    }

    // Cria uma nova transação
    public async Task<Result<TransactionDto>> CreateAsync(CreateTransactionDto dto)
    {
        try
        {
            // Verifica se a pessoa existe antes de criar a transação
            var person = await _personRepository.GetByIdAsync(dto.PersonId);
            if (person == null)
                return Result.Failure<TransactionDto>(new Error("Error.NotFound", "Pessoa não encontrada"));

            // Verifica se a categoria existe antes de criar a transação
            var category = await _categoryRepository.GetByIdAsync(dto.CategoryId);
            if (category == null)
                return Result.Failure<TransactionDto>(new Error("Error.NotFound", "Categoria não encontrada"));

            // Cria a transação com as informações fornecidas
            var money = new Money(dto.Value);
            var transaction = Transaction.Create(
                dto.Description,
                money,
                dto.Type,
                dto.CategoryId,
                dto.PersonId);

            // Verifica se a categoria é compatível com o tipo de transação
            transaction.ValidateCategoryPurpose(category.Purpose);

            // Verifica se a pessoa pode fazer este tipo de transação baseado na idade
            transaction.ValidatePersonAge(person.Age);

            var created = await _transactionRepository.AddAsync(transaction);

            var result = new TransactionDto(
                created.Id,
                created.Description,
                created.Value.Amount,
                created.Type,
                new CategoryDto(category.Id, category.Description, category.Purpose),
                new PersonDto(person.Id, person.Name, person.Age));

            return Result.Success(result);
        }
        catch (DomainException ex)
        {
            return Result.Failure<TransactionDto>(new Error("Error.BadRequest", ex.Message));
        }
    }
}
