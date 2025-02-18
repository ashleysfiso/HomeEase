using HomeEase.Data;
using HomeEase.Interfaces;
using HomeEase.Models;
using Microsoft.EntityFrameworkCore;

namespace HomeEase.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly ApplicationDbContext _context;
        public CustomerRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<Customer>> GetAllAsync()
        {
            var customers = await _context.Customers.ToListAsync();

            return customers;
        }

        public async Task<Customer?> GetByUserIdAsync(string userId)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c =>  c.UserId == userId);
            
            if(customer == null)
            {
                return null;
            }

            return customer;
        }

        public Task<Customer> UpdateAsync()
        {
            throw new NotImplementedException();
        }
    }
}
