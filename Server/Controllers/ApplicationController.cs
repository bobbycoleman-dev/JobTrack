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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Application>>> GetApplications()
        {
            return await _context.Applications.ToListAsync();
        }

        //! Get one
        [HttpGet("{id}")]
        public async Task<ActionResult<Application>> GetApplication(int id)
        {
            // Find the item in question
            var todoItem = await _context.Applications.FindAsync(id);
            // Check to see if we got back null, in which case return NotFound
            if (todoItem == null)
            {
                return NotFound();
            }
            // Otherwise, return the item
            return todoItem;
        }

        //! Create one
        [HttpPost]
        public async Task<ActionResult<Application>> PostTodoItem([FromBody] Application newApplication)
        {
            if (ModelState.IsValid)
            {
                _context.Applications.Add(newApplication);
                await _context.SaveChangesAsync();
                // This uses the GetTodoItem route we wrote above
                return CreatedAtAction(
                    nameof(GetApplication),
                    new { id = newApplication.ApplicationId },
                    newApplication);
            }
            else
            {
                // This is what will allow us to get error messages for our front end
                return BadRequest(ModelState);
            }
        }

        //! Update one
        [HttpPost("update/{id}")]
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

