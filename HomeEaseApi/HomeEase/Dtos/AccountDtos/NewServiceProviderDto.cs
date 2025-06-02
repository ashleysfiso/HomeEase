using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.AccountDtos
{
    public class NewServiceProviderDto
    {
        [Required]
        public string FirsName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string CompanyName { get; set; }
    }
}
