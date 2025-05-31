using HomeEase.Dtos.ServiceDto;
using HomeEase.Models;

namespace HomeEase.Mappers
{
    public static class ServiceMapper
    {
        public static Service ToService(this CreateServiceDto createServiceDto)
        {
            return new Service
            {
                Name = createServiceDto.Name,
                Description = createServiceDto.Description,
                BasePrice = createServiceDto.BasePrice
            };
        }

        public static ServiceDto ToServiceDto(this Service serviceModel)
        {
            return new ServiceDto
            {
                Id = serviceModel.Id,
                Name = serviceModel.Name,
                Description = serviceModel.Description,
                BasePrice = serviceModel.BasePrice,
                IsDeleted = serviceModel.isDeleted,
                ServiceTypes = serviceModel.ServiceTypes.Where(s => s.IsDeleted == false).Select(st => st.ToServiceTypeDto()).ToList(),
            };
        }
    }
}
