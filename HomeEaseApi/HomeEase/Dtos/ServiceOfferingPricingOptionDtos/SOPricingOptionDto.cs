namespace HomeEase.Dtos.ServiceOfferingPricingOptionDtos
{
    public class SOPricingOptionDto
    {
        public int PricingOptionId { get; set; }
        public string UnitLabel { get; set; }
        public string ServiceTypeName { get; set; }
        public string PricingOptionName { get; set; }
        public decimal Price { get; set; }
    }
}
