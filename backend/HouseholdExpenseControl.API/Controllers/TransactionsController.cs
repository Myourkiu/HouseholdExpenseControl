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
    public async Task<IActionResult> GetAll()
    {
        var result = await _transactionService.GetAllAsync();

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
