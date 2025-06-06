using HomeEase.Data;
using HomeEase.Dtos.PendingApprovalsDtos;
using HomeEase.Interfaces;
using HomeEase.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HomeEase.Repository
{
    public class PendingApprovalRepository : IPendingApprovalRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        public PendingApprovalRepository(ApplicationDbContext context, UserManager<AppUser> userManager) 
        {
            _context = context;
            _userManager = userManager;
        }
        public async Task<PendingApproval?> CreateAsync(PendingApproval pendingApproval)
        {
            var user = await _userManager.FindByEmailAsync(pendingApproval.Email);
            if (user != null)
            {
                return null;
            }
            var result = await _context.PendingApprovals.AddAsync(pendingApproval);
            await _context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<List<PendingApproval>> GetAllAsync()
        {
            var pendingApprovals = await _context.PendingApprovals.Where(p => p.Status == "Pending").ToListAsync();

            return pendingApprovals;
        }

        public async Task<PendingApproval?> GetByIdAsync(int id)
        {
            var pendingApproval = await _context.PendingApprovals.FirstOrDefaultAsync(pa =>  pa.Id == id);
            if(pendingApproval == null)
            {
                return null;
            }

            return pendingApproval;
        }

        public async Task<PendingApproval?> UpdateAsync(int id, UpdatePendingApprovalDto updatePendingApprovalDto)
        {
            var pendingApproval = await _context.PendingApprovals.FirstOrDefaultAsync(pa => pa.Id == id);
            if (pendingApproval == null)
            {
                return null;
            }

            pendingApproval.Status = updatePendingApprovalDto.Status;
            await _context.SaveChangesAsync();

            return pendingApproval;
        }
    }
}
