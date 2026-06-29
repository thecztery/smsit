using practise_backend.Data;
using practise_backend.DTO;
using practise_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace practise_backend.Services;

public class PostService
{
    private readonly ApplicationDbContext _context;

    public PostService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Post> CreatePost(CreatePostDto dto, int userId)
    {
        var post = new Post
        {
            Text = dto.Text,
            Image = dto.Image,
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Posts.Add(post);

        await _context.SaveChangesAsync();

        return post;
    }

    public async Task<List<PostDto>> GetPosts()
{
    return await _context.Posts
        .Include(p => p.User)
        .OrderByDescending(p => p.CreatedAt)
        .Select(p => new PostDto
        {
            Id = p.Id,
            Text = p.Text,
            Image = p.Image,
            CreatedAt = p.CreatedAt,
            Nickname = p.User.Nickname,
            UserPhoto = p.User.Photo
        })
        .ToListAsync();
}

public async Task<PostDto?> GetPost(int id)
{
    return await _context.Posts
        .Include(p => p.User)
        .Where(p => p.Id == id)
        .Select(p => new PostDto
        {
            Id = p.Id,
            Text = p.Text,
            Image = p.Image,
            CreatedAt = p.CreatedAt,
            Nickname = p.User.Nickname,
            UserPhoto = p.User.Photo,
            LikesCount = p.LikesCount,
            CommentsCount = p.Comments.Count,
        })
        .FirstOrDefaultAsync();
}

public async Task<bool> DeletePost(int id, int userId)
{
    var post = await _context.Posts.FirstOrDefaultAsync(p =>
        p.Id == id &&
        p.UserId == userId);

    if (post == null)
        return false;

    _context.Posts.Remove(post);

    await _context.SaveChangesAsync();

    return true;
}
}