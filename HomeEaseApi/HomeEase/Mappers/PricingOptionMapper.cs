using HomeEase.Dtos.PricingOptionDtos;
using HomeEase.Models;

namespace HomeEase.Mappers
{
    public static class PricingOptionMapper
    {
        public static PricingOption FromCreateDtoToPriceOption(this CreatePricingOptionDto createPricingOptionDto)
        {
            return new PricingOption()
            {
                ServiceTypeId = createPricingOptionDto.ServiceTypeId,
                Name = createPricingOptionDto.Name,
                UnitLabel = createPricingOptionDto.UnitLabel,
            };
        }

        public static PricingOptionDto ToPricingOptionDto(this PricingOption pricingOption)
        {
            return new PricingOptionDto()
            {
                Id = pricingOption.Id,
                ServiceTypeName = pricingOption.ServiceType.Name,
                Name = pricingOption.Name,
                UnitLabel = pricingOption.UnitLabel,
            };
        }
    }
}
