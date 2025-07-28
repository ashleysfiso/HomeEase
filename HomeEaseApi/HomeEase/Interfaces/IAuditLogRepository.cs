using HomeEase.Models;

namespace HomeEase.Interfaces
{
    public interface IAuditLogRepository
    {
        public Task<List<AuditLog>> GetAuditLogs();
    }
}
