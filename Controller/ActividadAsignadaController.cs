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
    public class ActividadAsignadaController : ControllerBase
    {
        private readonly ClassContext _context;
        public ActividadAsignadaController(ClassContext context)
        {
            _context = context;
            if (_context.ActividadesAsignadas.Count() == 0)
            {

                /*DocenteItem docente = new DocenteItem();
                docente.tipo_Documento = "CEDULA";
                docente.identificacion = 1003242276;
                docente.primer_Nombre = "JORGE";
                docente.segundo_Nombre = "DANIEL";
                docente.primer_Apellido = "RINCONES";
                docente.segundo_Apellido = "FERNANDEZ";
                docente.fecha_Nacimiento = Convert.ToDateTime("3/11/2000").Date;
                docente.genero = "MASCULINO";
                docente.email = "jodarrife12@gmail.com";
                docente.telefono = 3004128610;
                docente.cargo = "DOCENTE";
                docente.estadoSys = "ACTIVO";
                docente.tipo_Docente = "CATEDRATICO";
                docente.user_Name = "" + docente.identificacion;
                docente.contrasena = "" + docente.identificacion;

                _context.ActividadesAsignadas.Add(new ActividadAsignada {
                   
                    
                    DocenteItem = docente, 
                    horasAsignadas = 3 ,
                    estado = "Asignada"
                    });
                _context.SaveChanges();*/

            }
        }
        // Aquí, despues del constructor de la clase, irán los Métodos HTTP GET,POST, DELETE, PUT
        // GET: api/Acciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActividadAsignada>>> GetActividadAsignadas()
        {
            return await _context.ActividadesAsignadas.Include(t => t.DocenteItem).ToListAsync();
        }

        // GET: api/Acciones/1
        [HttpGet("{codigo}")]
        public async Task<ActionResult<ActividadAsignada>> GetActividadAsignadasItem(int id)
        {
            var actividad = await _context.ActividadesAsignadas.Include(t => t.DocenteItem).FirstOrDefaultAsync(i => i.codigo == id);
            if (actividad == null)
            {
                return NotFound();
            }
            return actividad;
        }
     

        [HttpGet("DocenteItem={DocenteItemId}")]
        public async Task<ActionResult<IEnumerable<ActividadAsignada>>> GetActividadAsignadasDocente(int DocenteItemId)
        {
            return await _context.ActividadesAsignadas.Include(t => t.DocenteItem).Where(i => i.DocenteItemId == DocenteItemId ).ToListAsync();
        }
        /*[HttpGet("TipoActividad={tipoActividadId}")]
        public async Task<ActionResult<IEnumerable<ActividadAsignada>>> GetActividadAsignadasTipoActivadad(int idTipo)
        {
           return await _context.ActividadesAsignadas.Include(t => t.Docente).Where(i=>i.tipoActividadId==idTipo).ToListAsync();
        }*/
        // POST: api/Acciones
        [HttpPost]
        public async Task<ActionResult<ActividadAsignada>> PostAsignarActividad(ActividadAsignada item)
        {
            if (item.DocenteItem != null)
            {
                item.DocenteItemId = item.DocenteItem.identificacion;
                item.DocenteItem = null;
            }
            _context.ActividadesAsignadas.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetActividadAsignadasItem), new { id = item.codigo }, item);
        }
        // PUT: api/Acciones/5
        [HttpPut("{codigo}")]
        public async Task<IActionResult> PutActicidadesAsignadas(int id, ActividadAsignada item)
        {
            if (id != item.codigo)
            {
                return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        // DELETE: api/Todo/5
        [HttpDelete("{codigo}")]
        public async Task<IActionResult> DeleteActicidadesAsignadas(int id)
        {
            var actividadAsignada = await _context.ActividadesAsignadas.FindAsync(id);
            if (actividadAsignada == null)
            {
                return NotFound();
            }

            _context.ActividadesAsignadas.Remove(actividadAsignada);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}