using System.ComponentModel.DataAnnotations;

namespace HomeEase.Dtos.ServiceTypeDtos
{
    public class CreateServiceTypeDto
    {
        [Required]
        public int ServiceId { get; set; }
        [Required]
        public string Name { get; set; }

    }
}
