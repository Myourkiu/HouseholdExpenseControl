namespace CleanArchCruds.Application.Interfaces;

public interface IService<TEntity, TDto> where TEntity : class
{
    Task<TDto?> GetByIdAsync(Guid id);
    Task<IEnumerable<TDto>> GetAllAsync();
    Task<TDto> CreateAsync(TDto dto);
    Task UpdateAsync(Guid id, TDto dto);
    Task DeleteAsync(Guid id);
}
