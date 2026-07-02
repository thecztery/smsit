using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using practise_backend.Services;

namespace practise_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LikeController : ControllerBase
{
    private readonly LikeService _likeService;

    public LikeController(LikeService likeService)
    {
        _likeService = likeService;
    }

    [Authorize]
    [HttpPost("{postId}")]
    public async Task<IActionResult> ToggleLike(int postId)
    {
           
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
            return Unauthorized();

        var result = await _likeService.ToggleLike(
    postId,
    int.Parse(userId));

return Ok(new
{
    liked = result.liked,
    likesCount = result.likesCount
});
    }
}