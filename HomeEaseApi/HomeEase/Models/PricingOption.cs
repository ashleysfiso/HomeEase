﻿namespace HomeEase.Models
{
    public class PricingOption
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UnitLabel { get; set; }
        public bool IsDeleted { get; set; } = false;
        public int ServiceTypeId { get; set; }
        public ServiceType ServiceType { get; set; }
    }
}
