#pragma warning disable CS8618
#pragma warning disable CS8600
#pragma warning disable CS8602
namespace Server.Models
{
    public class OnboardUser
    {
        public int OnboardUserId { get; set; }
        public string? OnboardLinkedIn { get; set; }
        public string? OnboardGitHub { get; set; }
        public string? OnboardPortfolioWebsite { get; set; }
        public string? OnboardPersonalWebsite { get; set; }
        public string? OnboardOtherWebsite { get; set; }
        public int OnboardDailySubmitGoal { get; set; } = 5;
    }
}

