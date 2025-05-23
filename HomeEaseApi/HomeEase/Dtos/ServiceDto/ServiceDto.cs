﻿using HomeEase.Dtos.ServiceTypeDtos;
using HomeEase.Models;

namespace HomeEase.Dtos.ServiceDto
{
    public class ServiceDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal BasePrice { get; set; }
        public bool IsDeleted { get; set; }
        public List<ServiceTypeDto> ServiceTypes { get; set; } = new List<ServiceTypeDto>();
    }
}
