using HouseholdExpenseControl.Application.DTOs.Person;
using HouseholdExpenseControl.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HouseholdExpenseControl.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonsController : ControllerBase
{
    private readonly IPersonService _personService;

    public PersonsController(IPersonService personService)
    {
        _personService = personService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        if (page < 1) page = 1;
        if (pageSize < 1 || pageSize > 100) pageSize = 10;

        var result = await _personService.GetAllAsync(page, pageSize);

        if (result.IsFailure)
            return StatusCode(result.StatusCode, new { error = result.Error });

        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _personService.GetByIdAsync(id);

        if (result.IsFailure)
            return StatusCode(result.StatusCode, new { error = result.Error });

        return Ok(result.Data);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePersonDto dto)
    {
        var result = await _personService.CreateAsync(dto);

        if (result.IsFailure)
            return StatusCode(result.StatusCode, new { error = result.Error });

        return Created(string.Empty, result.Data);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdatePersonDto dto)
    {
        var result = await _personService.UpdateAsync(id, dto);

        if (result.IsFailure)
            return StatusCode(result.StatusCode, new { error = result.Error });

        return Ok(result.Data);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _personService.DeleteAsync(id);

        if (result.IsFailure)
            return StatusCode(result.StatusCode, new { error = result.Error });

        return NoContent();
    }
}
