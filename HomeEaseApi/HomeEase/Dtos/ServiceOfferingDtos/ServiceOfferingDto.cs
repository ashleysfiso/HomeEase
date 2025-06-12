using System.ComponentModel.DataAnnotations;
using HomeEase.Dtos.ServiceOfferingPricingOptionDtos;
using HomeEase.Models;

namespace HomeEase.Dtos.ServiceOfferingDtos
{
    public class ServiceOfferingDto
    {
        public int ServiceId { get; set; }
        public int ServiceProviderId { get; set; }
        public string ServiceName { get; set; }
        public string CompanyName { get; set; }
        public decimal Rate { get; set; }
        public string Availability { get; set; }
        public string Description { get; set; }
        public string? ImgURL {  get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }
        public double? Rating { get; set; }
        public string ReviewCount { get; set; }
        public List<PricingOptionGroup2> PricingOptions { get; set; }
    }

    public class PricingOptionGroup2
    {
        public string ServiceTypeName { get; set; }
        public string LabelUnit { get; set; }
        public List<PricingOptionItem2> Options { get; set; }
    }

    public class PricingOptionItem2
    {
        public int ServiceTypeId { get; set; }
        public int PricingOptionId { get; set; }
        public string PricingOptionName { get; set; }
        public decimal Price { get; set; }
    }
}
