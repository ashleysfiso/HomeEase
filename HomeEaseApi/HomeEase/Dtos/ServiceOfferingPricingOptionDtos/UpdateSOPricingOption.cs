namespace HomeEase.Dtos.ServiceOfferingPricingOptionDtos
{
    public class UpdateSOPricingOption
    {
        public int ServiceProviderId { get; set; }
        public int ServiceId { get; set; }
        public int PricingOptionId { get; set; }
        public decimal Price { get; set; }
    }
}
