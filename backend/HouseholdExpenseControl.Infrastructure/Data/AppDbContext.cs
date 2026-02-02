using HouseholdExpenseControl.Domain.Entities;
using HouseholdExpenseControl.Domain.Enums;
using HouseholdExpenseControl.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace HouseholdExpenseControl.Infrastructure.Data;

// Contexto do banco de dados configurando as tabelas e relacionamentos
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Person> Persons => Set<Person>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Transaction> Transactions => Set<Transaction>();

    // Configura como as entidades serão mapeadas para as tabelas do banco
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configura a tabela de pessoas
        modelBuilder.Entity<Person>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Name).IsRequired().HasMaxLength(200);
            entity.Property(p => p.Age).IsRequired();
        });

        // Configura a tabela de categorias
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Description).IsRequired().HasMaxLength(400);
            entity.Property(c => c.Purpose)
                .IsRequired()
                .HasConversion<int>();
        });

        // Configura a tabela de transações e seus relacionamentos
        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(t => t.Id);
            entity.Property(t => t.Description).IsRequired().HasMaxLength(400);
            
            // Converte o ValueObject Money para decimal no banco
            entity.Property(t => t.Value)
                .IsRequired()
                .HasConversion(
                    v => v.Amount,
                    v => new Money(v))
                .HasColumnType("decimal(18,2)");

            entity.Property(t => t.Type)
                .IsRequired()
                .HasConversion<int>();

            // Ao deletar pessoa, deleta suas transações automaticamente
            entity.HasOne(t => t.Person)
                .WithMany()
                .HasForeignKey(t => t.PersonId)
                .OnDelete(DeleteBehavior.Cascade);

            // Impede deletar categoria se houver transações
            entity.HasOne(t => t.Category)
                .WithMany()
                .HasForeignKey(t => t.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
