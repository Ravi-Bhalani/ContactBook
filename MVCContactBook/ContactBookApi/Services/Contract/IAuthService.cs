using ContactBookApi.Dtos;
using ContactBookApi.Models;

namespace ContactBookApi.Services.Contract
{
    public interface IAuthService
    {
        ServiceResponse<string> RegisterUserService(RegisterDto register);
        ServiceResponse<string> LoginUserService(LoginDto login);

        ServiceResponse<string> ForgetPasswordService(ForgetDto forgetDto);
        ServiceResponse<string> ModifyUser(User updateDto);
        ServiceResponse<UpdateRegisterDto> GetUserById(string loginId);

    }
}
