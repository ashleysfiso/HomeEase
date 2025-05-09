using HomeEase.Models;

namespace HomeEase.Dtos.ServiceTypeDtos
{
    public class ServiceTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<PricingOptionGroup> PricingOptions { get; set; }
    }

    public class PricingOptionGroup
    {
        public int ServiceTypeId { get; set; }
        public string LabelUnit { get; set; }
        public List<PricingOptionItem> Options { get; set; }
    }

    public class PricingOptionItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

}
