using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocenteSharpHTTP.Models;
using System;

namespace DocenteSharpHTTP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccionesController : ControllerBase
    {
        private readonly ClassContext _context;
        public AccionesController(ClassContext context)
        {
            _context = context;
            if (_context.Acciones.Count() == 0)
            {
                _context.Acciones.Add(new AccionesItem
                {
                  
                });
                _context.SaveChanges();
            }
        }
        // Aquí, despues del constructor de la clase, irán los Métodos HTTP GET,POST, DELETE, PUT
        // GET: api/Acciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccionesItem>>> GetAcciones()
        {
            return await _context.Acciones.ToListAsync();
        }

        
        // GET: api/Acciones/1
        [HttpGet("{cod_Accion}")]
        public async Task<ActionResult<AccionesItem>> GetAcciones(int codAccion)
        {
            var accionesItem = await _context.Acciones.FindAsync(codAccion);
            if (accionesItem == null)
            {
                return NotFound();
            }
            return accionesItem;
        }
        // POST: api/Acciones
        [HttpPost]
        public async Task<ActionResult<AccionesItem>> PostAciones(AccionesItem item)
        {
            _context.Acciones.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAcciones), new { codAccion = item.codAccion }, item);
        }
        // PUT: api/Acciones/5
        [HttpPut("{cod_Accion}")]
        public async Task<IActionResult> PutAcciones(int codAccion, AccionesItem item)
        {
            if (codAccion != item.codAccion)
            {
                return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        // DELETE: api/Todo/5
        [HttpDelete("{cod_Accion}")]
        public async Task<IActionResult> DeleteAcciones(int codAccion)
        {
            var acciones = await
            _context.Acciones.FindAsync(codAccion);
            if (acciones == null)
            {
                return NotFound();
            }

            _context.Acciones.Remove(acciones);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}