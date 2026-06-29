using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using practise_backend.Data;
using practise_backend.DTO;
using practise_backend.Models;

namespace practise_backend.Services;

public class AuthService
{
    private readonly ApplicationDbContext _context;
    private readonly PasswordHasher<User> _passwordHasher = new();

    private readonly JwtService _jwtService;

    public AuthService(
    ApplicationDbContext context,
    JwtService jwtService)
{
    _context = context;
    _jwtService = jwtService;
}

    public async Task<AuthResultDto> Register(RegisterDto dto)
    {
        if (await _context.Users.AnyAsync(u => u.Nickname == dto.Nickname))
{
    return new AuthResultDto
    {
        Success = false,
        Message = "Такой псевдоним уже занят."
    };
}

        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
{
    return new AuthResultDto
    {
        Success = false,
        Message = "Такая почта уже зарегистрирована."
    };
}

        var user = new User
        {
            Nickname = dto.Nickname,
            Email = dto.Email,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Photo = dto.Photo,
            Contacts = dto.Contacts,
            About = dto.About,
            Achievements = dto.Achievements
        };

        user.PasswordHash =
            _passwordHasher.HashPassword(user, dto.Password);

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return new AuthResultDto
{
    Success = true,

    Message = "Регистрация успешна.",

    User = new UserDto
    {
        Id = user.Id,
        Nickname = user.Nickname,
        Email = user.Email,
        Photo = user.Photo
    }
};
    }

    public async Task<AuthResultDto> Login(LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u =>
            u.Nickname == dto.Login ||
            u.Email == dto.Login);

        if (user == null)
            return new AuthResultDto
{
    Success = false,
    Message = "Неверный логин или пароль."
};

        var result = _passwordHasher.VerifyHashedPassword(
            user,
            user.PasswordHash,
            dto.Password);

        if (result == PasswordVerificationResult.Failed)
            return new AuthResultDto
{
    Success = false,
    Message = "Неверный логин или пароль."
};
var token = _jwtService.GenerateToken(user);

        return new AuthResultDto
{
    Success = true,

    Message = "Авторизация успешна.",

    Token = token,

    User = new UserDto
    {
        Id = user.Id,
        Nickname = user.Nickname,
        Email = user.Email,
        Photo = user.Photo
    }
};
    }
}