namespace HomeEase.Models
{
    public class ServiceOfferingPricingOption
    {
        public int ServiceProviderId { get; set; }
        public int ServiceId { get; set; }
        public int PricingOptionId { get; set; }
        public decimal Price { get; set; }

        public ServiceOffering ServiceOffering { get; set; }
        public PricingOption PricingOption { get; set; }
    }
}
