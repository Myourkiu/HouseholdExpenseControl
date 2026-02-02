using HouseholdExpenseControl.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HouseholdExpenseControl.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TotalsController : ControllerBase
{
    private readonly ITotalsService _totalsService;

    public TotalsController(ITotalsService totalsService)
    {
        _totalsService = totalsService;
    }

    [HttpGet("Persons")]
    public async Task<IActionResult> GetPersonTotalsReport()
    {
        var result = await _totalsService.GetPersonTotalsReportAsync();

        if (result.IsFailure)
            return StatusCode(result.StatusCode, new { error = result.Error });

        return Ok(result.Data);
    }

    [HttpGet("Categories")]
    public async Task<IActionResult> GetCategoryTotalsReport()
    {
        var result = await _totalsService.GetCategoryTotalsReportAsync();

        if (result.IsFailure)
            return StatusCode(result.StatusCode, new { error = result.Error });

        return Ok(result.Data);
    }
}
