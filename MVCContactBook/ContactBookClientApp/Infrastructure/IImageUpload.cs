namespace ContactBookClientApp.Infrastructure
{
    public interface IImageUpload
    {
        string AddImageFileToPath(IFormFile imageFile);
    }
}
