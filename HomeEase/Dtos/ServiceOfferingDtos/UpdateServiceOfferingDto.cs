using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.ServiceOfferingDtos
{
    public class UpdateServiceOfferingDto
    {
        [Required]
        public decimal Rate { get; set; }
        [Required]
        public string Availability { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
