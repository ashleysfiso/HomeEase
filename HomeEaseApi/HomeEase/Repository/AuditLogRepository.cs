using HomeEase.Data;
using HomeEase.Interfaces;
using HomeEase.Models;
using Microsoft.EntityFrameworkCore;

namespace HomeEase.Repository
{
    public class AuditLogRepository : IAuditLogRepository
    {
        private readonly ApplicationDbContext _context;
        public AuditLogRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<AuditLog>> GetAuditLogs()
        {
            var logs = await _context.AuditLogs.ToListAsync();
            return logs;
        }
    }
}
