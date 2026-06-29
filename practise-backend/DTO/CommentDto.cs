namespace practise_backend.DTO;

public class CommentDto
{
    public int Id { get; set; }

    public string Text { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    public int UserId { get; set; }

    public string Nickname { get; set; } = string.Empty;

    public string? UserPhoto { get; set; }
}