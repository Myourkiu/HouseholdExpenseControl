using HouseholdExpenseControl.Application.Common;
using HouseholdExpenseControl.Application.DTOs.Person;
using HouseholdExpenseControl.Application.Interfaces;
using HouseholdExpenseControl.Domain.Entities;
using HouseholdExpenseControl.Domain.Exceptions;
using HouseholdExpenseControl.Domain.Interfaces;

namespace HouseholdExpenseControl.Application.UseCases;

// Gerencia as operações de negócio relacionadas a pessoas
public class PersonService : IPersonService
{
    private readonly IPersonRepository _personRepository;

    public PersonService(IPersonRepository personRepository)
    {
        _personRepository = personRepository;
    }

    // Busca uma pessoa pelo ID retornando erro se não encontrar
    public async Task<Result<PersonDto>> GetByIdAsync(Guid id)
    {
        var person = await _personRepository.GetByIdAsync(id);

        if (person == null)
            return Result.Failure<PersonDto>(Error.NotFound);

        var dto = new PersonDto(person.Id, person.Name, person.Age);
        return Result.Success(dto);
    }

    // Retorna todas as pessoas cadastradas
    public async Task<Result<IEnumerable<PersonDto>>> GetAllAsync()
    {
        var persons = await _personRepository.GetAllAsync();
        var dtos = persons.Select(person => new PersonDto(person.Id, person.Name, person.Age));
        return Result.Success(dtos);
    }

    // Cria uma nova pessoa validando as regras de negócio
    public async Task<Result<PersonDto>> CreateAsync(CreatePersonDto dto)
    {
        try
        {
            var person = Person.Create(dto.Name, dto.Age);
            var created = await _personRepository.AddAsync(person);
            var result = new PersonDto(created.Id, created.Name, created.Age);
            return Result.Success(result);
        }
        catch (DomainException ex)
        {
            return Result.Failure<PersonDto>(new Error("Error.BadRequest", ex.Message));
        }
    }

    // Atualiza os dados de uma pessoa existente
    public async Task<Result<PersonDto>> UpdateAsync(Guid id, UpdatePersonDto dto)
    {
        var existingPerson = await _personRepository.GetByIdAsync(id);
        if (existingPerson == null)
            return Result.Failure<PersonDto>(Error.NotFound);

        try
        {
            existingPerson.UpdateName(dto.Name);
            existingPerson.UpdateAge(dto.Age);
            
            await _personRepository.UpdateAsync(existingPerson);
            var result = new PersonDto(existingPerson.Id, existingPerson.Name, existingPerson.Age);
            return Result.Success(result);
        }
        catch (DomainException ex)
        {
            return Result.Failure<PersonDto>(new Error("Error.BadRequest", ex.Message));
        }
    }

    // Remove uma pessoa e todas suas transações
    public async Task<Result> DeleteAsync(Guid id)
    {
        var exists = await _personRepository.ExistsAsync(id);
        if (!exists)
            return Result.Failure(Error.NotFound);

        await _personRepository.DeleteAsync(id);
        return Result.Success();
    }
}
