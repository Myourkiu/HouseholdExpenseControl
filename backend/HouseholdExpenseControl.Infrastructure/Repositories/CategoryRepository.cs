using HouseholdExpenseControl.Domain.Entities;
using HouseholdExpenseControl.Domain.Interfaces;
using HouseholdExpenseControl.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HouseholdExpenseControl.Infrastructure.Repositories;

// Implementa o acesso aos dados de categorias no banco
public class CategoryRepository : ICategoryRepository
{
    private readonly AppDbContext _context;

    public CategoryRepository(AppDbContext context)
    {
        _context = context;
    }

    // Busca uma categoria pelo ID no banco
    public async Task<Category?> GetByIdAsync(Guid id)
    {
        return await _context.Categories.FindAsync(id);
    }

    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        return await _context.Categories.ToListAsync();
    }

    public async Task<IEnumerable<Category>> GetPagedAsync(int page, int pageSize)
    {
        var skip = (page - 1) * pageSize;
        return await _context.Categories
            .OrderBy(c => c.Description)
            .Skip(skip)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<int> CountAsync()
    {
        return await _context.Categories.CountAsync();
    }

    // Adiciona uma nova categoria no banco
    public async Task<Category> AddAsync(Category category)
    {
        await _context.Categories.AddAsync(category);
        await _context.SaveChangesAsync();
        return category;
    }

    // Verifica se uma categoria existe no banco
    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Categories.AnyAsync(c => c.Id == id);
    }
}
