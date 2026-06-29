namespace practise_backend.Models;

public class Post
{
    public int Id { get; set; }

    public string Text { get; set; } = string.Empty;

    public string? Image { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int UserId { get; set; }

    public User User { get; set; } = null!;

    public List<Comment> Comments { get; set; } = new();

    public int LikesCount { get; set; } = 0;
}