using HomeEase.Dtos.ServiceOfferingDtos;
using HomeEase.Dtos.ServiceTypeDtos;
using HomeEase.Models;

namespace HomeEase.Mappers
{
    public static class ServiceOfferingMapper
    {
        public static ServiceOfferingDto ToServiceOfferingDto(this ServiceOffering serviceOffering)
        {
            return new ServiceOfferingDto
            {
                ServiceId = serviceOffering.ServiceId,
                ServiceProviderId = serviceOffering.ServiceProviderId,
                ServiceName = serviceOffering.Service.Name,
                CompanyName = serviceOffering.ServiceProvider.CompanyName,
                Rate = serviceOffering.Rate,
                Availability = serviceOffering.Availability,
                Description = serviceOffering.Service.Description,
                ImgURL = serviceOffering.ImgURL,
                Status = serviceOffering.Status,
                IsDeleted = serviceOffering.IsDeleted,
                PricingOptions = serviceOffering.PricingOptions.GroupBy(po => new {po.PricingOption.ServiceType.Name, po.PricingOption.UnitLabel})
                                                               .Select(group => new PricingOptionGroup2
                                                               {
                                                                   ServiceTypeName = group.Key.Name,
                                                                   LabelUnit = group.Key.UnitLabel,
                                                                   Options = group.Select(item => new PricingOptionItem2
                                                                   {
                                                                       ServiceTypeId = item.PricingOption.ServiceTypeId,
                                                                       PricingOptionId = item.PricingOptionId,
                                                                       PricingOptionName = item.PricingOption.Name,
                                                                       Price = item.Price,
                                                                   }).ToList()
                                                               }).ToList(),
            };
        }


        public static ServiceOffering ToServiceOffering(this CreateServiceOfferingDto serviceOfferingDto)
        {
            return new ServiceOffering
            {
                ServiceId = serviceOfferingDto.ServiceId,
                ServiceProviderId = serviceOfferingDto.ServiceProviderId,
                Rate = serviceOfferingDto.Rate,
                Availability = serviceOfferingDto.Availability,
                Description = serviceOfferingDto.Description,
                PricingOptions = serviceOfferingDto.pricingOptionsToSO.Select(item => new ServiceOfferingPricingOption
                {
                    PricingOptionId = item.PricingOptionId,
                    Price = item.Price,
                }).ToList()
            };
        }
    }
}
