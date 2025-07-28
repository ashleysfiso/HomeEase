using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.AccountDtos
{
    public class UpdatePassword
    {
        [Required]
        public string userId { get; set; }
        [Required]
        public string currentPassword { get; set; }
        [Required]
        public string newPassword { get; set; }
    }
}
