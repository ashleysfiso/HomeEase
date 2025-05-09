using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.PendingApprovalsDtos
{
    public class CreatePendingApprovalDto
    {
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string CompanyName { get; set; }
        [Required]
        public string Experience { get; set; }
    }
}
