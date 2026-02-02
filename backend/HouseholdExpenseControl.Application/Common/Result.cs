namespace HouseholdExpenseControl.Application.Common;

// Representa o resultado de uma operação que pode ter sucesso ou falhar
public class Result
{
    protected Result(bool isSuccess, Error error)
    {
        // Garante que sucesso não tenha erro e falha sempre tenha um erro
        switch (isSuccess)
        {
            case true when error != Error.None: throw new InvalidOperationException();
            case false when error == Error.None: throw new InvalidOperationException();

            default:
                IsSuccess = isSuccess;
                Error = error;
                break;
        }
    }

    public bool IsSuccess { get; }
    public bool IsFailure => !IsSuccess;
    public Error Error { get; }

    // Cria um Result de sucesso sem dados
    public static Result Success() => new Result(true, Error.None);
    
    // Cria um Result de falha com informações do erro
    public static Result Failure(Error error) => new Result(false, error);
    
    // Cria um Result de sucesso com dados
    public static Result<T> Success<T>(T value) => new Result<T>(true, value, Error.None);
    
    // Cria um Result de falha com dados
    public static Result<T> Failure<T>(Error error) => new Result<T>(false, default, error);
    
    // Cria um Result verificando se o valor é nulo
    public static Result<T> Create<T>(T? value) =>
        value is not null ? Success(value) : Failure<T>(Error.NullValue);
    
    // Converte o Result para um código HTTP apropriado
    public int StatusCode => IsSuccess ? 200 : GetStatusCodeFromError();
    
    // Mapeia o código do erro para um status HTTP
    private int GetStatusCodeFromError()
    {
        return Error.Code switch
        {
            "Error.NotFound" => 404,
            "Error.BadRequest" => 400,
            "Error.Conflict" => 409,
            "Error.NullValue" => 400,
            _ => 500
        };
    }
}

// Result que carrega um valor quando bem-sucedido
public class Result<T> : Result
{
    private readonly T? _value;

    protected internal Result(bool isSuccess, T? value, Error error) : base(isSuccess, error)
    {
        _value = value;
    }

    // Retorna o valor se sucesso, senão lança exceção
    public T Value => IsSuccess
        ? _value!
        : throw new InvalidOperationException("Não é possível acessar o valor de um resultado com falha.");
    
    // Retorna o valor permitindo nulo
    public T? Data => _value;
}