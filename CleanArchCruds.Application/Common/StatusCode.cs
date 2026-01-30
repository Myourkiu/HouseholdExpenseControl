namespace CleanArchCruds.Application.Common;

public static class StatusCode
{
    public const int OK = 200;
    public const int Created = 201;
    public const int NoContent = 204;
    public const int BadRequest = 400;
    public const int NotFound = 404;
    public const int Conflict = 409;
    public const int InternalServerError = 500;

    private static readonly HashSet<int> ValidCodes = new()
    {
        OK, Created, NoContent, BadRequest, NotFound, Conflict, InternalServerError
    };

    public static bool IsValid(int statusCode) => ValidCodes.Contains(statusCode);
}
