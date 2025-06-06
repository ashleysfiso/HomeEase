using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.PendingApprovalsDtos
{
    public class CreatePendingApprovalDto
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string CompanyName { get; set; }
        [Required]
        public string Experience { get; set; }
    }
}
