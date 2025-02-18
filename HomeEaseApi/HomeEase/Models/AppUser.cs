using Microsoft.AspNetCore.Identity;

namespace HomeEase.Models
{
    public class AppUser : IdentityUser
    {
        // Relationships to other entities
        public Customer? Customer { get; set; }
        public ServiceProvider? ServiceProvider { get; set; }
    }
}
