using HomeEase.Dtos.ServiceOfferingPricingOptionDtos;
using HomeEase.Models;

namespace HomeEase.Mappers
{
    public static class ServiceOfferingPricingOptionMapper
    {
        public static ServiceOfferingPricingOption FromCreateSOPOToSOPO(this CreateSOPricingOption createSOPricing)
        {
            return new ServiceOfferingPricingOption
            {
                ServiceId = createSOPricing.ServiceId,
                ServiceProviderId = createSOPricing.ServiceProviderId,
                PricingOptionId = createSOPricing.PricingOptionId,
                Price = createSOPricing.Price,
            };
        }

        public static SOPricingOptionDto ToSOPricingOptionDto(this ServiceOfferingPricingOption soPricingOption)
        {
            return new SOPricingOptionDto
            {
                PricingOptionId = soPricingOption.PricingOptionId,
                ServiceTypeName = soPricingOption.PricingOption.ServiceType.Name,
                PricingOptionName = soPricingOption.PricingOption.Name,
                UnitLabel = soPricingOption.PricingOption.UnitLabel,
                Price = soPricingOption.Price,
            };
        }
    }
}
