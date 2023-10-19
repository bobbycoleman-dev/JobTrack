using System.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
namespace Server.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private JobTrackContext _context;
        public UserController(JobTrackContext context)
        {
            _context = context;
        }

        //! Get one User
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            // Find the item in question
            var userInDb = await _context.Users.FindAsync(id);
            // Check to see if we got back null, in which case return NotFound
            if (userInDb == null)
            {
                return NotFound();
            }
            // Otherwise, return the item
            return userInDb;
        }

        //! Get one User by email
        [HttpGet("{email}")]
        public async Task<ActionResult<User>> GetUserByEmail(string email)
        {
            // Find the item in question
            User? userInDb = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            // Check to see if we got back null, in which case return NotFound
            if (userInDb == null)
            {
                return NotFound();
            }
            // Otherwise, return the item
            return userInDb;
        }

        //! Register User
        [HttpPost("register")]
        public async Task<ActionResult<User>> RegisterUser([FromBody] User newUser)
        {
            if (!ModelState.IsValid)
            {
                var message = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));
                Console.WriteLine(message);
            }

            if (ModelState.IsValid)
            {
                //* Hash Password
                PasswordHasher<User> Hasher = new();
                newUser.Password = Hasher.HashPassword(newUser, newUser.Password);

                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();
                // This uses the GetTodoItem route we wrote above
                return CreatedAtAction(
                    nameof(GetUser),
                    new { id = newUser.UserId },
                    newUser);
            }

            Console.WriteLine(ModelState);

            return BadRequest(ModelState);
        }

        //! Login User
        [HttpPost("login")]
        public async Task<ActionResult<User>> LoginUser([FromBody] LoginUser returningUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // User? UserInDb = await _context.Users.FindAsync(returningUser.LogEmail);
            User? UserInDb = await _context.Users.FirstOrDefaultAsync(u => u.Email == returningUser.LogEmail);

            if (UserInDb == null)
            {
                ModelState.AddModelError("LogPassword", "Invalid Email/Password");
                return BadRequest(ModelState);
            }

            //* Check hashed password
            PasswordHasher<LoginUser> Hasher = new();
            PasswordVerificationResult result = Hasher.VerifyHashedPassword(returningUser, UserInDb.Password, returningUser.LogPassword);

            if (result == 0)
            {
                ModelState.AddModelError("LogPassword", "Invalid Email/Password");
                return BadRequest(ModelState);
            }

            return UserInDb;
        }

        //! Onboard User
        [HttpPost("{id}/onboard")]
        public async Task<ActionResult<User>> OnboardUser(int id, [FromBody] OnboardUser onboardForm)
        {
            if (id != onboardForm.OnboardUserId)
            {
                return BadRequest();
            }

            User? originalUser = await _context.Users.FindAsync(id);

            if (originalUser == null)
            {
                return NotFound();
            }

            originalUser.LinkedIn = onboardForm.OnboardLinkedIn;
            originalUser.GitHub = onboardForm.OnboardGitHub;
            originalUser.PortfolioWebsite = onboardForm.OnboardPortfolioWebsite;
            originalUser.PersonalWebsite = onboardForm.OnboardPersonalWebsite;
            originalUser.OtherWebsite = onboardForm.OnboardOtherWebsite;
            originalUser.DailySubmitGoal = onboardForm.OnboardDailySubmitGoal;
            originalUser.UpdatedAt = DateTime.Now;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!UserExists(id))
            {
                return NotFound();
            }
            return originalUser;
        }

        //! Onboard User
        [HttpPost("{id}/update")]
        public async Task<ActionResult<User>> UpdateUser(int id, [FromBody] UpdateUser updateForm)
        {
            if (id != updateForm.UpdateUserId)
            {
                return BadRequest();
            }

            User? originalUser = await _context.Users.FindAsync(id);

            if (originalUser == null)
            {
                return NotFound();
            }

            originalUser.FirstName = updateForm.UpdateFirstName;
            originalUser.LastName = updateForm.UpdateLastName;
            originalUser.Email = updateForm.UpdateEmail;
            originalUser.LinkedIn = updateForm.UpdateLinkedIn;
            originalUser.GitHub = updateForm.UpdateGitHub;
            originalUser.PortfolioWebsite = updateForm.UpdatePortfolioWebsite;
            originalUser.PersonalWebsite = updateForm.UpdatePersonalWebsite;
            originalUser.OtherWebsite = updateForm.UpdateOtherWebsite;
            originalUser.DailySubmitGoal = updateForm.UpdateDailySubmitGoal;
            originalUser.UpdatedAt = DateTime.Now;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!UserExists(id))
            {
                return NotFound();
            }
            return originalUser;
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}