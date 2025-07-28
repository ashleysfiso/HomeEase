using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.AccountDtos
{
    public class RegisterDto
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression(@"^0\d{9}$", ErrorMessage = "Phone number must be 10 digits and start with 0 (e.g., 0821234567).")]
        public string PhoneNumber { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
