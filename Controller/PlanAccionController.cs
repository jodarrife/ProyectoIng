namespace DocenteSharpHTTP.Controllers
{
    using DocenteSharpHTTP.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    public class PlanAccionesController : ControllerBase
    {
        private readonly ClassContext _context;
        public PlanAccionesController(ClassContext context)
        {
            _context = context;


            if (_context.Planes.Count() == 0)
            {
            }
        }

        // Aqu�, despues del constructor de la clase, ir�n los M�todos HTTP GET,POST, DELETE, PUT
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlanAcciones>>> GetPlanes()
        {
            return await _context.Planes
            .Include(t => t.Acciones)
            .Include(t => t.ActividadAsignada)
            .ThenInclude(t=>t.DocenteItem)
            .ToListAsync();
        }
         [HttpGet("docente={identificacion}")]
        public async Task<ActionResult<IEnumerable<PlanAcciones>>> GetPlanes(int identificacion)
        {
            return await _context.Planes
            .Include(t => t.Acciones)
            .Include(t => t.ActividadAsignada)
            .ThenInclude(t => t.DocenteItem)
            .Where(t=>t.ActividadAsignada.DocenteItem.identificacion==identificacion)
            .ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<PlanAcciones>> GetPlan(int id)
        {
            //prueba linq
            var planAcciones = await _context.Planes
            .Include(t => t.Acciones)
            .Include(t => t.ActividadAsignada)
            .ThenInclude(t=>t.DocenteItem)
            .FirstOrDefaultAsync(i => i.IdPlanAcciones == id);
            if (planAcciones == null)
            {
                return NotFound();
            }
            return planAcciones;
        }
         [HttpGet("actividad={idActividad}")]
        public async Task<ActionResult<PlanAcciones>> GetPlanByActividad(int idActividad)
        {
            //prueba linq
            var planAcciones = await _context.Planes
            .Include(t => t.Acciones)
            .Include(t => t.ActividadAsignada)
            .ThenInclude(t=>t.DocenteItem)
            .FirstOrDefaultAsync(i => i.ActividadId == idActividad);
            if (planAcciones == null)
            {
                return NotFound();
            }
            return planAcciones;
        }
        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<PlanAcciones>> PostPlan(PlanAcciones plan)
        {
        plan.ActividadId=plan.ActividadAsignada.idActividad;
        plan.ActividadAsignada=null;
           
            _context.Planes.Add(plan);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPlan), new { id = plan.IdPlanAcciones }, plan);

        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlan(int id, PlanAcciones item)
        {
            if (id != item.IdPlanAcciones)
            {
                return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlan(int id)
        {
            var planAcciones = await _context.Planes
                .Include(t=>t.Acciones)
                .FirstOrDefaultAsync(t=>t.IdPlanAcciones==id);
            if (planAcciones == null)
            {
                return NotFound();
            }
            _context.Acciones.RemoveRange(planAcciones.Acciones);
            _context.Planes.Remove(planAcciones);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}