using HomeEase.Dtos.BookingDtos;
using HomeEase.Dtos.ServiceTypeDtos;
using HomeEase.Models;

namespace HomeEase.Interfaces
{
    public interface IServiceTypeRepository
    {
        public Task<List<ServiceType>> GetAllAsync();
        public Task<ServiceType?> GetByIdAsync(int id);
        public Task<ServiceType?> CreateAsync(ServiceType serviceType);
        public Task<ServiceType?> UpdateAsync(int id, UpdateServiceTypeDto serviceTypeDto);
        public Task<ServiceType?> DeleteAsync(int id);
    }
}
