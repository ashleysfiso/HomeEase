using HomeEase.Dtos.ServiceOfferingDtos;
using HomeEase.Models;

namespace HomeEase.Interfaces
{
    public interface IServiceOfferingRepository
    {
        public Task<List<ServiceOffering>> GetAllAsync();
        public Task<ServiceOffering?> GetByIdAsync(int ServiceProviderId, int ServiceId);
        public Task<ServiceOffering?> CreateAsync(ServiceOffering serviceOffering);
        public Task<ServiceOffering?> UpdateAsync(UpdateServiceOfferingDto serviceOfferingDto, int ServiceProviderId, int ServiceId);
        public Task<ServiceOffering?> DeleteAsync(int ServiceProviderId, int ServiceId);
        
    }
}
