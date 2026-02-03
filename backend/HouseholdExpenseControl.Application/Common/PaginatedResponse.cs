namespace HouseholdExpenseControl.Application.Common;

// Classe de resposta paginada de tipo T
public class PaginatedResponse<T>
{
    public PaginatedResponse(IEnumerable<T> items, int page, int pageSize, int totalCount)
    {
        Items = items;
        Page = page;
        PageSize = pageSize;
        TotalCount = totalCount;
        TotalPages = pageSize > 0 ? (int)Math.Ceiling(totalCount / (double)pageSize) : 0;
        HasNextPage = Page < TotalPages;
        HasPreviousPage = Page > 1;
    }

    public IEnumerable<T> Items { get; }
    public int Page { get; }
    public int PageSize { get; }
    public int TotalCount { get; }
    public int TotalPages { get; }
    public bool HasNextPage { get; }
    public bool HasPreviousPage { get; }
}
