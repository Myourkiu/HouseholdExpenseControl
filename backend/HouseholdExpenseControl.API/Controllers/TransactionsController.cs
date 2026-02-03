using HouseholdExpenseControl.Application.DTOs.Transaction;
using HouseholdExpenseControl.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HouseholdExpenseControl.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly ITransactionService _transactionService;

    public TransactionsController(ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        if (page < 1) page = 1;
        if (pageSize < 1 || pageSize > 100) pageSize = 10;

        var result = await _transactionService.GetAllAsync(page, pageSize);

        if (result.IsFailure)
            return StatusCode(result.StatusCode, new { error = result.Error });

        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _transactionService.GetByIdAsync(id);

        if (result.IsFailure)
            return StatusCode(result.StatusCode, new { error = result.Error });

        return Ok(result.Data);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTransactionDto dto)
    {
        var result = await _transactionService.CreateAsync(dto);

        if (result.IsFailure)
            return StatusCode(result.StatusCode, new { error = result.Error });

        return Created(string.Empty, result.Data);
    }
}
