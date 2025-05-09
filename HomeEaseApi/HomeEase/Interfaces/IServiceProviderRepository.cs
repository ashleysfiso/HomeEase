using HomeEase.Dtos.ServiceProviderDtos;
using HomeEase.Models;
using ServiceProvider = HomeEase.Models.ServiceProvider;

namespace HomeEase.Interfaces
{
    public interface IServiceProviderRepository
    {
        public Task<List<ServiceProvider>> GetAllAsync();
        public Task<ServiceProvider?> UpdateAsync(int id, UpdateServiceProvicerDto updateDto);
        
    }
}
