namespace practise_backend.Models;

public class User
{
    public int Id { get; set; }

    public string Nickname { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Photo { get; set; }

    public string? Contacts { get; set; }

    public string? About { get; set; }

    public string? Achievements { get; set; }

    public List<Post> Posts { get; set; } = new();

    public List<Comment> Comments { get; set; } = new();

    public ICollection<Like> Likes { get; set; } = new List<Like>();
}