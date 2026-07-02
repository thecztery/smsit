namespace practise_backend.DTO;

public class PostDto
{
    public int Id { get; set; }

    public string Text { get; set; } = string.Empty;

    public string? Image { get; set; }

    public DateTime CreatedAt { get; set; }

    public int LikesCount { get; set; }

    public int CommentsCount { get; set; }

    public string Nickname { get; set; } = string.Empty;

    public string? UserPhoto { get; set; }

    public bool IsLiked { get; set; }
}