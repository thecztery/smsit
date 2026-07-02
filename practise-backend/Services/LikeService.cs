using Microsoft.EntityFrameworkCore;
using practise_backend.Data;
using practise_backend.Models;

namespace practise_backend.Services;

public class LikeService
{
    private readonly ApplicationDbContext _context;

    public LikeService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<(bool liked, int likesCount)> ToggleLike(int postId, int userId)
{
    Console.WriteLine($"PostId = {postId}, UserId = {userId}");

    var post = await _context.Posts.FindAsync(postId);

    if (post == null)
    {
        Console.WriteLine("Post not found");
        throw new Exception("Post not found");
    }

    var allLikes = await _context.Likes.ToListAsync();

    Console.WriteLine($"Всего лайков в БД: {allLikes.Count}");

    var like = await _context.Likes.FirstOrDefaultAsync(l =>
        l.PostId == postId &&
        l.UserId == userId);

    Console.WriteLine(like == null
        ? "Лайк не найден"
        : "Лайк найден");

    if (like != null)
    {
        Console.WriteLine("Removing like");

        _context.Likes.Remove(like);

        if (post.LikesCount > 0)
            post.LikesCount--;

        var result = await _context.SaveChangesAsync();

        Console.WriteLine($"SaveChanges = {result}");

        return (false, post.LikesCount);
    }

    Console.WriteLine("Adding like");

    like = new Like
    {
        PostId = postId,
        UserId = userId,
        CreatedAt = DateTime.UtcNow
    };

    _context.Likes.Add(like);

    post.LikesCount++;

    var saveResult = await _context.SaveChangesAsync();

    Console.WriteLine($"SaveChanges = {saveResult}");

    return (true, post.LikesCount);
}
}