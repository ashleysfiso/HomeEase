using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.ServiceOfferingDtos
{
    public class ServiceOfferingDto
    {
        public int ServiceId { get; set; }
        public int ServiceProviderId { get; set; }
        public string ServiceName { get; set; }
        public string CompanyName { get; set; }
        [Required]
        public decimal Rate { get; set; }
        [Required]
        public string Availability { get; set; }
        [Required]
        public string Description { get; set; }
        public string? ImgURL {  get; set; }
        public string Status { get; set; }
    }
}
