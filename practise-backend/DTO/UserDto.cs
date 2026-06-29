namespace practise_backend.DTO;

public class UserDto
{
    public int Id { get; set; }

    public string Nickname { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string? Photo { get; set; }
}