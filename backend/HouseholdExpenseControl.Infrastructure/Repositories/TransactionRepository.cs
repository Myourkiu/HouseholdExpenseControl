using HouseholdExpenseControl.Domain.Entities;
using HouseholdExpenseControl.Domain.Interfaces;
using HouseholdExpenseControl.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HouseholdExpenseControl.Infrastructure.Repositories;

// Implementa o acesso aos dados de transações no banco
public class TransactionRepository : ITransactionRepository
{
    private readonly AppDbContext _context;

    public TransactionRepository(AppDbContext context)
    {
        _context = context;
    }

    // Busca uma transação pelo ID trazendo também pessoa e categoria
    public async Task<Transaction?> GetByIdAsync(Guid id)
    {
        return await _context.Transactions
            .Include(t => t.Person)
            .Include(t => t.Category)
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    // Retorna todas as transações trazendo também pessoa e categoria
    public async Task<IEnumerable<Transaction>> GetAllAsync()
    {
        return await _context.Transactions
            .Include(t => t.Person)
            .Include(t => t.Category)
            .ToListAsync();
    }

    // Adiciona uma nova transação no banco
    public async Task<Transaction> AddAsync(Transaction transaction)
    {
        await _context.Transactions.AddAsync(transaction);
        await _context.SaveChangesAsync();
        return transaction;
    }

    // Verifica se uma transação existe no banco
    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Transactions.AnyAsync(t => t.Id == id);
    }
}
