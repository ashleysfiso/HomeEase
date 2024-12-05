using System.ComponentModel.DataAnnotations.Schema;

namespace HomeEase.Models
{
    public class Service
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal BasePrice { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
