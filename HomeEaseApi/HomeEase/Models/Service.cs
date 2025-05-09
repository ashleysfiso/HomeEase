using System.ComponentModel.DataAnnotations.Schema;

namespace HomeEase.Models
{
    public class Service
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal BasePrice { get; set; }

        public bool isDeleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public List<ServiceType> ServiceTypes { get; set; } = new List<ServiceType>();
        public List<ServiceOffering> ServiceProviderServices { get; set; } = new List<ServiceOffering>();
    }
}
