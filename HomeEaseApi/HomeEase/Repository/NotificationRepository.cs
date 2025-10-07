using System;
using System.Text.Json;
using HomeEase.Data;
using HomeEase.Dtos.BookingDtos;
using HomeEase.Dtos.NotificationDtos;
using HomeEase.Interfaces;
using HomeEase.Mappers;
using HomeEase.Models;
using HomeEase.Services;
using HomeEase.Utility;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace HomeEase.Repository
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly NotificationService _notificationService;
        private readonly ApplicationDbContext _context;

        public NotificationRepository(NotificationService notificationService, ApplicationDbContext context)
        {
            _notificationService = notificationService;
            _context = context;
        }

        public async Task<int> GetUnreadNotificationCount(string userId)
        {
            var notificationCount = await _context.UserNotifications.Where(n => n.UserId == userId).CountAsync(n => n.Opened == false);
            return notificationCount;
        }

        public async Task<PagedResult<NotificationDto>> GetUserNotifications(string userId, int skip = 0, int take = 10, string? searchTerm = null)
        {
            var query = _context.UserNotifications.OrderByDescending(n => n.SentAt)
                                         .Where(n => n.UserId == userId)
                                         .AsQueryable();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(n => n.Title.Contains(searchTerm));
            }

            var totalCount = await query.CountAsync();

            var items = await query.Skip(skip)
                                   .Take(take)
                                   .Select(n => n.ToNotificationDto())
                                   .ToListAsync();

            return new PagedResult<NotificationDto>
            {
                Items = items,
                TotalCount = totalCount,
                PageNumber = (skip / take) + 1,
                PageSize = take
            };
        }

        public async Task<string?> MarkNotificationsAsOpened(int id)
        {
            var notification = await _context.UserNotifications.FirstOrDefaultAsync(n => n.Id == id);
            if (notification == null) return null;
            notification.Opened = true;
            await _context.SaveChangesAsync();
            return "Marked as opened";
        }

        public async Task<string?> RegisterDeviceAsync(string userId, string expoPushToken)
        {
            var existing = await _context.NotificationTokens.FirstOrDefaultAsync(t => t.UserId == userId);
            if (existing != null)
            {
                existing.ExpoPushToken = expoPushToken;
                await _context.SaveChangesAsync();
                return "Push token successfully registered.";
            }
            else
            {
                if (await _context.Users.AnyAsync(u => u.Id == userId))
                {
                    var token = new NotificationToken
                    {
                        UserId = userId,
                        ExpoPushToken = expoPushToken
                    };
                    _context.NotificationTokens.Add(token);
                    await _context.SaveChangesAsync();
                    return "Push token successfully registered.";
                }
                else
                {
                    return null;
                }
            }    
        }

        public async Task<UserNotification> SendNotificationAsync(string userId, string title, string body, object data = null)
        {
            var token = _context.NotificationTokens.FirstOrDefault(t => t.UserId == userId);
            if (token?.ExpoPushToken != null)
            {
               await _notificationService.SendNotificationAsync(token.ExpoPushToken, title, body, data);
            }
            // Save to history
            var notificationRecord = new UserNotification
            {
                ExpoPushToken = token != null ? token.ExpoPushToken : "No Expo Push Token",
                Title = title,
                Body = body,
                UserId = userId,
                Data = data != null ? JsonSerializer.Serialize(data) : "No Data",
                Delivered = true,
                SentAt = DateTime.UtcNow
            };

            _context.UserNotifications.Add(notificationRecord);
            await _context.SaveChangesAsync();
            return notificationRecord;
        }
    }
}
