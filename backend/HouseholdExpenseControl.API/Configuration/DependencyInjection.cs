using HouseholdExpenseControl.Application.Interfaces;
using HouseholdExpenseControl.Application.UseCases;
using HouseholdExpenseControl.Domain.Interfaces;
using HouseholdExpenseControl.Infrastructure.Data;
using HouseholdExpenseControl.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace HouseholdExpenseControl.API.Configuration;

public static class DependencyInjection
{
    public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
    {
        // API
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        // CORS
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy.WithOrigins(
                    "http://localhost:5173",
                    "http://localhost:5174",
                    "http://localhost:3000",
                    "http://127.0.0.1:5173",
                    "http://127.0.0.1:5174"
                )
                .AllowAnyMethod()
                .AllowAnyHeader();
            });
        });

        // Db
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(connectionString));

        // Services
        services.AddScoped<IPersonService, PersonService>();
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<ITransactionService, TransactionService>();
        services.AddScoped<ITotalsService, TotalsService>();

        // Repositories
        services.AddScoped<IPersonRepository, PersonRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<ITransactionRepository, TransactionRepository>();

        return services;
    }
}
