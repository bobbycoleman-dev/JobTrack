#pragma warning disable CS8618
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
namespace Server.Models
{
    public class Application
    {

        [Key]
        public int ApplicationId { get; set; }

        [Required]
        [DisplayName("Company Name")]
        public string CompanyName { get; set; }

        [Required]
        [DisplayName("Company Website")]
        public string CompanyWebsite { get; set; }

        [Required]
        [DisplayName("Position Title")]
        public string PositionTitle { get; set; }

        [Required]
        [DisplayName("Application Website")]
        public string ApplicationWebsite { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public string Type { get; set; }

        public string Status { get; set; } = "Applied";

        [DisplayName("Contact Email")]
        public string? ContactEmail { get; set; }

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;


        public int UserId { get; set; }
        public User? Applicant { get; set; }

        public List<Interview> Interviews { get; set; } = new();

    }
}
