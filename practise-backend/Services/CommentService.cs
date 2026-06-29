using Microsoft.EntityFrameworkCore;
using practise_backend.Data;
using practise_backend.DTO;
using practise_backend.Models;

namespace practise_backend.Services;

public class CommentService
{
    private readonly ApplicationDbContext _context;

    public CommentService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Comment> CreateComment(
        int postId,
        int userId,
        CreateCommentDto dto)
    {
        var comment = new Comment
        {
            Text = dto.Text,
            UserId = userId,
            PostId = postId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Comments.Add(comment);

        await _context.SaveChangesAsync();

        return comment;
    }

    public async Task<List<CommentDto>> GetComments(int postId)
    {
        return await _context.Comments
            .Include(c => c.User)
            .Where(c => c.PostId == postId)
            .OrderBy(c => c.CreatedAt)
            .Select(c => new CommentDto
            {
                Id = c.Id,
                Text = c.Text,
                CreatedAt = c.CreatedAt,
                UserId = c.UserId,
                Nickname = c.User.Nickname,
                UserPhoto = c.User.Photo
            })
            .ToListAsync();
    }

    public async Task<bool> DeleteComment(
        int commentId,
        int userId)
    {
        var comment = await _context.Comments
            .FirstOrDefaultAsync(c =>
                c.Id == commentId &&
                c.UserId == userId);

        if (comment == null)
            return false;

        _context.Comments.Remove(comment);

        await _context.SaveChangesAsync();

        return true;
    }
}