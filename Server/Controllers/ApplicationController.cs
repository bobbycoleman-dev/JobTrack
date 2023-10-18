using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
namespace Server.Controllers
{
    [Route("api/applications")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private JobTrackContext _context;
        public ApplicationController(JobTrackContext context)
        {
            _context = context;
        }

        //! Get all
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Application>>> GetApplications(int userId)
        {
            List<Application> appsList = await _context.Applications.Where(a => a.UserId == userId).OrderByDescending(a => a.ApplicationId).ToListAsync();

            return appsList;
        }

        //! Get one
        [HttpGet("view/{id}")]
        public async Task<ActionResult<Application>> GetApplication(int id)
        {
            // Find the item in question
            var application = await _context.Applications.FindAsync(id);
            // Check to see if we got back null, in which case return NotFound
            if (application == null)
            {
                return NotFound();
            }
            // Otherwise, return the item
            return application;
        }

        //! Create one
        [HttpPost]
        public async Task<ActionResult<Application>> CreateApplicationLog([FromBody] Application newApplication)
        {
            if (ModelState.IsValid)
            {
                _context.Applications.Add(newApplication);
                await _context.SaveChangesAsync();
                return CreatedAtAction(
                    nameof(GetApplication),
                    new { id = newApplication.ApplicationId },
                    newApplication);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        //! Update one
        [HttpPost("{userId}/update/{id}")]
        public async Task<IActionResult> UpdateTodoItem(int id, [FromBody] Application updatedApplication)
        {
            // If the id from the route doesn't match the id of the item we passed along, throw a bad request
            if (id != updatedApplication.ApplicationId)
            {
                return BadRequest();
            }
            // Find the original item
            var originalApplication = await _context.Applications.FindAsync(id);
            // Verify the original item exists
            if (originalApplication == null)
            {
                return NotFound();
            }
            // Added to update item
            // originalApplication.Name = todoItem.Name;
            // originalApplication.IsComplete = todoItem.IsComplete;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!ApplicationExists(id))
            {
                return NotFound();
            }
            return NoContent();
        }

        //! Delete one
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteApplication(int id)
        {
            var applicationToDelete = await _context.Applications.FindAsync(id);
            if (applicationToDelete == null)
            {
                return NotFound();
            }
            _context.Applications.Remove(applicationToDelete);
            await _context.SaveChangesAsync();
            return NoContent();
        }





        private bool ApplicationExists(int id)
        {
            return _context.Applications.Any(e => e.ApplicationId == id);
        }

    }
}

