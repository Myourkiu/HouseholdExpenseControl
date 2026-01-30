namespace CleanArchCruds.Application.Common;

public class Result
{
    public int StatusCode { get; protected set; }
    public string? Error { get; protected set; }

    public bool IsSuccess => StatusCode >= 200 && StatusCode < 300;
    public bool IsFailure => !IsSuccess;

    protected Result(int statusCode, string? error = null)
    {
        if (!Common.StatusCode.IsValid(statusCode))
            throw new ArgumentException($"Status code {statusCode} não é válido. Use: 200, 201, 204, 400, 404, 409, 500");
        
        StatusCode = statusCode;
        Error = error;
    }

    public static Result Success(int statusCode = 200)
    {
        return new Result(statusCode);
    }

    public static Result Failure(int statusCode, string error)
    {
        return new Result(statusCode, error);
    }

    public static Result<T> Success<T>(T data, int statusCode = 200)
    {
        return new Result<T>(statusCode, data, null);
    }

    public static Result<T> Failure<T>(int statusCode, string error)
    {
        return new Result<T>(statusCode, default, error);
    }
}

public class Result<T> : Result
{
    public T? Data { get; private set; }

    internal Result(int statusCode, T? data, string? error = null)
        : base(statusCode, error)
    {
        Data = data;
    }
}
