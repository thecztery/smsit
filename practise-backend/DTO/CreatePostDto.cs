namespace practise_backend.DTO;

public class CreatePostDto
{
    public string Text { get; set; } = string.Empty;

    public string? Image { get; set; }
}