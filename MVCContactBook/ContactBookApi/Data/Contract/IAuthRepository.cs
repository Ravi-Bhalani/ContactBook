using ContactBookApi.Models;

namespace ContactBookApi.Data.Contract
{
    public interface IAuthRepository
    {
        bool RegisterUser(User user);

        User? ValidateUser(string username);

        bool UserExist(string loginId, string email);
        bool UserExist(string loginId, string email, int userId);
        User? GetUseById(string loginId);



        bool UpdateUser(User user);
    }
}
