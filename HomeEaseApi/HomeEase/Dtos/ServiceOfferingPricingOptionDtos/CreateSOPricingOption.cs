using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.ServiceOfferingPricingOptionDtos
{
    public class CreateSOPricingOption
    {
        [Required]
        public int ServiceProviderId { get; set; }
        [Required]
        public int ServiceId { get; set; }
        [Required]
        public int PricingOptionId { get; set; }
        [Required]
        public decimal Price { get; set; }
    }
}
