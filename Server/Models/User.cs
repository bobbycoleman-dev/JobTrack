#pragma warning disable CS8618
#pragma warning disable CS8600
#pragma warning disable CS8602
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;
namespace Server.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [DisplayName("First Name")]
        [MinLength(2)]
        [MaxLength(45)]
        public string FirstName { get; set; }

        [Required]
        [DisplayName("Last Name")]
        [MinLength(2)]
        [MaxLength(45)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [UniqueEmail]
        [MaxLength(45)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [RegularExpression("^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", ErrorMessage = "Password must be at least 8 characters long and contain 1 letter, 1 number, and 1 special character")]
        public string Password { get; set; }

        public string? LinkedIn { get; set; }
        public string? GitHub { get; set; }
        public string? PortfolioWebsite { get; set; }
        public string? PersonalWebsite { get; set; }
        public string? OtherWebsite { get; set; }
        public int DailySubmitGoal { get; set; } = 5;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public List<Application> SubmittedApplications { get; set; }

        [NotMapped]
        [Required]
        [DataType(DataType.Password)]
        [Compare("Password")]
        [DisplayName("Confirm Password")]
        public string ConfirmPassword { get; set; }

    }

    public class UniqueEmailAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
            {
                return new ValidationResult("Email is required!");
            }

            JobTrackContext _context = (JobTrackContext)validationContext.GetService(typeof(JobTrackContext));
            if (_context.Users.Any(e => e.Email == value.ToString()))
            {
                return new ValidationResult("Email in use. Please use a different email or log in");
            }
            else
            {
                return ValidationResult.Success;
            }
        }
    }
}

