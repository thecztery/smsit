using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using practise_backend.DTO;
using practise_backend.Services;

namespace practise_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly PostService _postService;
    private readonly CommentService _commentService;

    public PostsController(
        PostService postService,
        CommentService commentService)
    {
        _postService = postService;
        _commentService = commentService;
    }

    // Просмотр всех постов (доступен всем)
    [HttpGet]
    public async Task<IActionResult> GetPosts()
    {
        return Ok(await _postService.GetPosts());
    }

    // Просмотр одного поста (доступен всем)
    [HttpGet("{id}")]
    public async Task<IActionResult> GetPost(int id)
    {
        var post = await _postService.GetPost(id);

        if (post == null)
            return NotFound();

        return Ok(post);
    }

    // Создание поста (только авторизованным)
    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(CreatePostDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
            return Unauthorized();

        var post = await _postService.CreatePost(dto, int.Parse(userId));

        return Ok(post);
    }

    // Удаление своего поста
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
            return Unauthorized();

        var result = await _postService.DeletePost(id, int.Parse(userId));

        if (!result)
            return NotFound();

        return Ok();
    }

    // Просмотр комментариев (доступен всем)
    [HttpGet("{postId}/comments")]
    public async Task<IActionResult> GetComments(int postId)
    {
        return Ok(await _commentService.GetComments(postId));
    }

    // Добавление комментария (только авторизованным)
    [Authorize]
    [HttpPost("{postId}/comments")]
    public async Task<IActionResult> CreateComment(
        int postId,
        CreateCommentDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
            return Unauthorized();

        var comment = await _commentService.CreateComment(
            postId,
            int.Parse(userId),
            dto);

        return Ok(comment);
    }

    // Удаление своего комментария
    [Authorize]
    [HttpDelete("{postId}/comments/{commentId}")]
    public async Task<IActionResult> DeleteComment(
        int postId,
        int commentId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
            return Unauthorized();

        var result = await _commentService.DeleteComment(
            commentId,
            int.Parse(userId));

        if (!result)
            return NotFound();

        return Ok();
    }
}