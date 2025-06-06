﻿using Microsoft.AspNetCore.Identity;

namespace HomeEase.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public Customer? Customer { get; set; }
        public ServiceProvider? ServiceProvider { get; set; }
    }
}
