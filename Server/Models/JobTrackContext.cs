#pragma warning disable CS8618
using Microsoft.EntityFrameworkCore;
namespace Server.Models
{
    public class JobTrackContext : DbContext
    {
        public JobTrackContext(DbContextOptions<JobTrackContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<Interview> Interviews { get; set; }
    }
}

