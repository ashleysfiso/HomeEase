namespace HomeEase.Models
{
    public class ServiceType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ServiceId { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Service Service { get; set; }
        public List<PricingOption> PricingOptions { get; set; } = new List<PricingOption>();
    }
}
