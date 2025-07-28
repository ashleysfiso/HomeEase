using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.AccountDtos
{
    public class EditProfile
    {
        [Required]
        public string userId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [RegularExpression(@"^0\d{9}$", ErrorMessage = "Phone number must be 10 digits and start with 0 (e.g., 0821234567).")]
        public string PhoneNumber { get; set; }
    }
}
