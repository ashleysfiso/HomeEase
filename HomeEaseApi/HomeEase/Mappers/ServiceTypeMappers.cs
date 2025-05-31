using HomeEase.Dtos.ServiceTypeDtos;
using HomeEase.Models;

namespace HomeEase.Mappers
{
    public static class ServiceTypeMappers
    {
        public static ServiceType FromCreateToServiceType(this CreateServiceTypeDto createServiceType)
        {
            return new ServiceType
            {
                ServiceId = createServiceType.ServiceId,
                Name = createServiceType.Name,
            };
        }

        public static ServiceTypeDto ToServiceTypeDto(this ServiceType serviceType)
        {
            return new ServiceTypeDto
            {
                Id = serviceType.Id,
                Name = serviceType.Name,
                PricingOptions = serviceType.PricingOptions.Where(po => po.IsDeleted == false).GroupBy(x => new { x.ServiceTypeId, x.UnitLabel })
                                .Select(group => new PricingOptionGroup
                                {
                                    ServiceTypeId = group.Key.ServiceTypeId,
                                    LabelUnit = group.Key.UnitLabel,
                                    Options = group.Select(item => new PricingOptionItem
                                    {
                                        Id = item.Id,
                                        Name = item.Name
                                    }).ToList()
                                })
                                .ToList(),
            };
        }
    }
}
