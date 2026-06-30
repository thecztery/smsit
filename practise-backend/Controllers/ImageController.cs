using Microsoft.AspNetCore.Mvc;
using practise_backend.Services;

namespace practise_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImageController : ControllerBase
{
    private readonly ImageService _imageService;

    public ImageController(ImageService imageService)
    {
        _imageService = imageService;
    }

    [HttpPost("upload/{folder}")]
    public async Task<IActionResult> Upload(
        string folder,
        IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("Файл не выбран.");

        if (folder != "avatars" && folder != "posts")
            return BadRequest("Неверная папка.");

        Console.WriteLine(file.FileName);
Console.WriteLine(file.Length);

var path = await _imageService.SaveImage(file, folder);

        return Ok(new
        {
            path = path
        });
    }
}