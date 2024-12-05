using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.AccountDtos
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}
