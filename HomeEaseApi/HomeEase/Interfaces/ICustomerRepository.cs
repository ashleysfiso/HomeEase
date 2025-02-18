using HomeEase.Models;

namespace HomeEase.Interfaces
{
    public interface ICustomerRepository
    {
        public Task<List<Customer>> GetAllAsync();
        public Task<Customer?> GetByUserIdAsync(string userId);
        public Task<Customer> UpdateAsync();
    }
}
