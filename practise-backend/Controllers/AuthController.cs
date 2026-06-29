using Microsoft.AspNetCore.Mvc;
using practise_backend.DTO;
using practise_backend.Services;

namespace practise_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
public async Task<IActionResult> Register(RegisterDto dto)
{
    var result = await _authService.Register(dto);

    if (!result.Success)
        return BadRequest(result);

    return Ok(result);
}

    [HttpPost("login")]
public async Task<IActionResult> Login(LoginDto dto)
{
    var result = await _authService.Login(dto);

    if (!result.Success)
        return Unauthorized(result);

    return Ok(result);
}
}