using HomeEase.Dtos.ServiceOfferingPricingOptionDtos;
using HomeEase.Models;

namespace HomeEase.Interfaces
{
    public interface IServiceOfferingPricingOptionRepository
    {
        public Task<List<ServiceOfferingPricingOption>> GetAllAsync();
        public Task<ServiceOfferingPricingOption?> CreateAsync(ServiceOfferingPricingOption serviceOfferingPricingOption);
        public Task<ServiceOfferingPricingOption?> UpdateAsync(UpdateSOPricingOption updateSOPricingOption);
    }
}
