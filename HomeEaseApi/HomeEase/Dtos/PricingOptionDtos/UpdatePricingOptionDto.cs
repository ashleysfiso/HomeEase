using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.PricingOptionDtos
{
    public class UpdatePricingOptionDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string? UnitLabel { get; set; }
    }
}
