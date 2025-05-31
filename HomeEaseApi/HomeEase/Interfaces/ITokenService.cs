using HomeEase.Models;
using Microsoft.AspNetCore.Identity;

namespace HomeEase.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateAccessToken(AppUser user);
        string CreateRefreshToken();
    }
}
