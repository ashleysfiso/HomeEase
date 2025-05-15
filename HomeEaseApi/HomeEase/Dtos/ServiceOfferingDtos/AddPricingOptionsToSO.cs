using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.ServiceOfferingDtos
{
    public class AddPricingOptionsToSO
    {
        [Required]
        public int PricingOptionId { get; set; }
        [Required]
        public decimal Price { get; set; }
    }
}
