using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.PricingOptionDtos
{
    public class CreatePricingOptionDto
    {
        [Required]
        public int ServiceTypeId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string? UnitLabel { get; set; }
    }
}
