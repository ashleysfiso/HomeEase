using HomeEase.Models;

namespace HomeEase.Interfaces
{
    public interface IAuditQueue
    {
        void Enqueue(AuditLog log);
    }
}
