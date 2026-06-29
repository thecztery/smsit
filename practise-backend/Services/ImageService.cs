namespace practise_backend.Services;

public class ImageService
{
    private readonly IWebHostEnvironment _environment;

    public ImageService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<string> SaveImage(
        IFormFile file,
        string folder)
    {
        var fileName =
            Guid.NewGuid() +
            Path.GetExtension(file.FileName);

        var directory =
            Path.Combine(
                _environment.WebRootPath,
                folder);

        Directory.CreateDirectory(directory);

        var path =
            Path.Combine(directory, fileName);

        using var stream =
            new FileStream(path, FileMode.Create);

        await file.CopyToAsync(stream);

        return $"{folder}/{fileName}";
    }
}