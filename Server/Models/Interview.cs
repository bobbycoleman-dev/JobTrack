#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace Server.Models
{
    public class Interview
    {

        [Key]
        public int InterviewId { get; set; }

        [Required]
        public string InterviewerName { get; set; }

        public string? InterviewerTitle { get; set; }

        [EmailAddress]
        public string? InterviewerEmail { get; set; }

        [Phone]
        public int? InterviewerPhoneNumber { get; set; }

        public string? InterviewAddress { get; set; }

        [Required]
        public DateTime? InterviewDate { get; set; }

        public bool ThankYouSent { get; set; } = false;

        [DataType(DataType.Date)]
        public DateTime? ThankYouSentDate { get; set; }

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public int ApplicationId { get; set; }
        public Application? Position { get; set; }
    }
}