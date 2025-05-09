using HomeEase.Dtos.ServiceOfferingDtos;
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
                Description = serviceOfferingDto.Description
            };
        }
    }
}
