#pragma warning disable CS8618
#pragma warning disable CS8600
#pragma warning disable CS8602
namespace Server.Models
{
    public class UpdateUser
    {
        public int UpdateUserId { get; set; }
        public string UpdateFirstName { get; set; }
        public string UpdateLastName { get; set; }
        public string UpdateEmail { get; set; }
        public string? UpdateLinkedIn { get; set; }
        public string? UpdateGitHub { get; set; }
        public string? UpdatePortfolioWebsite { get; set; }
        public string? UpdatePersonalWebsite { get; set; }
        public string? UpdateOtherWebsite { get; set; }
        public int UpdateDailySubmitGoal { get; set; }
    }
}