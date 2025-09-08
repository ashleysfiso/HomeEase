using HomeEase.Dtos.ServiceOfferingDtos;
using HomeEase.Models;
using HomeEase.Utility;

namespace HomeEase.Interfaces
{
    public interface IServiceOfferingRepository
    {
        public Task<List<ServiceOffering>> GetAllAsync();
        public Task<PagedResult<ServiceOfferingDto>> GetPagedAsync(int skip , int take,string? searchTerm);
        public Task<ServiceOffering?> GetByIdAsync(int ServiceProviderId, int ServiceId);
        public Task<List<ServiceOffering>> GetAllByServiceProviderId(int ServiceProviderId);
        public Task<List<ServiceOffering>> GetPopularServices();
        public Task<ServiceOffering?> CreateAsync(ServiceOffering serviceOffering);
        public Task<ServiceOffering?> UpdateAsync(UpdateServiceOfferingDto serviceOfferingDto, int ServiceProviderId, int ServiceId);
        public Task<ServiceOffering?> UpdateStatusAsync(string status, int ServiceProviderId, int ServiceId);
        public Task<ServiceOffering?> DeleteAsync(int ServiceProviderId, int ServiceId);

        
    }
}
