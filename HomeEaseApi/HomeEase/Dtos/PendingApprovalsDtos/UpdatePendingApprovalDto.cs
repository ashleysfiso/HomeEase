using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.PendingApprovalsDtos
{
    public class UpdatePendingApprovalDto
    {
        [Required]
        public string Status { get; set; }
    }
}
