using System;
using HomeEase.Data;
using HomeEase.Repository;

namespace HomeEase.Services
{
    public class AuditLogBackgroundService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly AuditQueue _auditQueue;

        public AuditLogBackgroundService(IServiceProvider serviceProvider, AuditQueue auditQueue)
        {
            _serviceProvider = serviceProvider;
            _auditQueue = auditQueue;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                while (_auditQueue.Queue.TryDequeue(out var log))
                {
                    using var scope = _serviceProvider.CreateScope();
                    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                    db.AuditLogs.Add(log);
                    await db.SaveChangesAsync(stoppingToken);
                }

                await Task.Delay(1000, stoppingToken);
            }
        }
    }
}
