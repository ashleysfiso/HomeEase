using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.ServiceDto
{
    public class UpdateServiceDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public decimal BasePrice { get; set; }
    }
}
