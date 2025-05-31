using Microsoft.AspNetCore.Identity;

namespace HomeEase.Models
{
    public static class IdentityUserExtensions
    {
        public static void SetRefreshToken(this AppUser user, string token, DateTime expiry)
        {
           user.RefreshToken = token;
           user.RefreshTokenExpiryTime = expiry;
        }

        public static string RefreshToken { get; set; }
        public static DateTime RefreshTokenExpiry { get; set; }
    }
}
