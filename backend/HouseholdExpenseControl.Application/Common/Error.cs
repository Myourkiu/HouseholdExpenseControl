namespace HouseholdExpenseControl.Application.Common;

// Erro comum para o result
public record Error(string Code, string Message)
{
    // Identificador para mostrar que não houve erro
    public static Error None = new Error(string.Empty, string.Empty);
    // Erro para valor nulo
    public static Error NullValue = new Error("Error.NullValue", "O valor não pode ser nulo");
    // Erro para recurso não encontrado
    public static Error NotFound = new Error("Error.NotFound", "Recurso não encontrado");
    // Erro para requisição inválida
    public static Error BadRequest = new Error("Error.BadRequest", "Requisição inválida");
    // Erro para conflito de dados
    public static Error Conflict = new Error("Error.Conflict", "Conflito de dados");
}