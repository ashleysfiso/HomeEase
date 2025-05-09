using HomeEase.Dtos.ServiceProviderDtos;
using HomeEase.Models;

namespace HomeEase.Mappers
{
    public static class ServiceProviderMappers
    {
        public static ServiceProviderDto ToServiceProviderDto(this Models.ServiceProvider serviceProvider)
        {
            return new ServiceProviderDto
            {
                Id = serviceProvider.Id,
                CompanyName = serviceProvider.CompanyName,
                Status = serviceProvider.Status,
                Rating = serviceProvider.Reviews.Count != 0 ? $"{serviceProvider.Reviews.Average(x => x.Rating)}" : "No Ratings Yet",
                ReviewCount = $"{ serviceProvider.Reviews.Count()}",
                Services = serviceProvider.ServiceProviderServices.Select(sps => sps.Service.Name).ToList(),

            };
        }
    }
}
