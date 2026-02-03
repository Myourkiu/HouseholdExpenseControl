using HouseholdExpenseControl.Domain.Entities;
using HouseholdExpenseControl.Domain.Interfaces;
using HouseholdExpenseControl.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HouseholdExpenseControl.Infrastructure.Repositories;

// Implementa o acesso aos dados de pessoas no banco
public class PersonRepository : IPersonRepository
{
    private readonly AppDbContext _context;

    public PersonRepository(AppDbContext context)
    {
        _context = context;
    }

    // Busca uma pessoa pelo ID no banco
    public async Task<Person?> GetByIdAsync(Guid id)
    {
        return await _context.Persons.FindAsync(id);
    }

    public async Task<IEnumerable<Person>> GetAllAsync()
    {
        return await _context.Persons.ToListAsync();
    }

    public async Task<IEnumerable<Person>> GetPagedAsync(int page, int pageSize)
    {
        var skip = (page - 1) * pageSize;
        return await _context.Persons
            .OrderBy(p => p.Name)
            .Skip(skip)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<int> CountAsync()
    {
        return await _context.Persons.CountAsync();
    }

    // Adiciona uma nova pessoa no banco
    public async Task<Person> AddAsync(Person person)
    {
        await _context.Persons.AddAsync(person);
        await _context.SaveChangesAsync();
        return person;
    }

    // Salva as alterações de uma pessoa já rastreada pelo EF Core
    public async Task UpdateAsync(Person person)
    {
        await _context.SaveChangesAsync();
    }

    // Remove uma pessoa do banco
    public async Task DeleteAsync(Guid id)
    {
        var person = await GetByIdAsync(id);
        if (person != null)
        {
            _context.Persons.Remove(person);
            await _context.SaveChangesAsync();
        }
    }

    // Verifica se uma pessoa existe no banco
    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Persons.AnyAsync(p => p.Id == id);
    }
}
