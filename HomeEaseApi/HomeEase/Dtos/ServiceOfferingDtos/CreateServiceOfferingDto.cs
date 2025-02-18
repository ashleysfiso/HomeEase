using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.ServiceOfferingDtos
{
    public class CreateServiceOfferingDto
    {
        [Required]
        public int ServiceId { get; set; }
        [Required]
        public int ServiceProviderId { get; set; }
        [Required]
        public decimal Rate { get; set; }
        [Required]
        public string Availability { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
