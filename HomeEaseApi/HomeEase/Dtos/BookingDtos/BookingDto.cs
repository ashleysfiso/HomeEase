﻿namespace HomeEase.Dtos.BookingDtos
{
    public class BookingDto
    {
        public int Id { get; set; }
        public string? CustomerName { get; set; }
        public string? CustomerPhone { get; set; }
        public string ServiceName { get; set; }
        public string ServiceTypeName { get; set; }
        public string CompanyName { get; set; }
        public string Size { get; set; }
        public DateOnly BookingDate { get; set; }
        public string Time { get; set; }
        public string Status { get; set; } 
        public decimal TotalCost { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string Address { get; set; }
        public double? Rating { get; set; }
    }
}
