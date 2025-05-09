using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.PricingOptionDtos
{
    public class PricingOptionDto
    {
        public int Id { get; set; }
        public string ServiceTypeName { get; set; }
        public string Name { get; set; }
        public string? UnitLabel { get; set; }

    }
}
