using System.Collections.Concurrent;
using HomeEase.Interfaces;
using HomeEase.Models;

namespace HomeEase.Repository
{
    public class AuditQueue : IAuditQueue
    {
        private readonly ConcurrentQueue<AuditLog> _queue = new();
        public ConcurrentQueue<AuditLog> Queue => _queue;

        public void Enqueue(AuditLog log)
        {
            _queue.Enqueue(log);
        }
    }
}
