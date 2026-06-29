namespace practise_backend.DTO;

public class RegisterDto
{
    public string Nickname { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Photo { get; set; }

    public string? Contacts { get; set; }

    public string? About { get; set; }

    public string? Achievements { get; set; }
}