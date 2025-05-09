using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.ServiceTypeDtos
{
    public class UpdateServiceTypeDto
    {
        [Required]
        public string Name { get; set; }
    }
}
