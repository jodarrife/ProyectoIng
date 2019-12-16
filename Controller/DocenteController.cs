namespace DocenteSharpHTTP.Controllers
{
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using DocenteSharpHTTP.Models;
using System.Threading.Tasks;
using System;
using System.Data;


    [Route("api/[controller]")]
    [ApiController]
    public class DocenteController : ControllerBase
    {

        private readonly ClassContext _context;
        public DocenteController(ClassContext context)
        {
            _context = context;
            if (_context.Docentes.Count() == 0)
            {
                DocenteItem docente = new DocenteItem();
                    
                    docente.identificacion = 1003242276;
                    docente.tipo_Documento = "CEDULA";
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
                    docente.user_Name = ""+docente.identificacion;
                    docente.contrasena = ""+docente.identificacion;

                // Crea un nuevo item si la coleccion esta vacia,
                // lo que significa que no puedes borrar todos los Items.
                //_context.Docentes.Add(new DocenteItem { Tipo_Docente = "CATEDRATICO" });
                _context.Docentes.Add(docente);
                _context.SaveChanges();
            }
        }

        // Aquí, despues del constructor de la clase, irán los Métodos HTTP GET,POST, DELETE, PUT
        // GET: api/Docente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DocenteItem>>> GetDocentes()
        {
            return await _context.Docentes.ToListAsync();
        }

        
        // GET: api/Docente/1003242276
        [HttpGet("{identificacion}")]
        public async Task<ActionResult<DocenteItem>> GetDocentes(int identificacion)
        {
            var docenteItem = await _context.Docentes.FindAsync(identificacion);
            if (docenteItem == null)
            {
                return NotFound();
            }
            return docenteItem;
        }
        // POST: api/Docente
        [HttpPost]
        public async Task<ActionResult<DocenteItem>> PostDocente(DocenteItem item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            /**var docenteItem = await _context.Docentes.FindAsync(identificacion);
            if (docenteItem != null)
            {
                return BadRequest();
            }*/

            _context.Docentes.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDocentes), new { identificacion = item.identificacion }, item);
        }


    
    // PUT: api/Docente/5
    [HttpPut("{identificacion}")]
    public async Task<IActionResult> PutDocente(int identificacion, DocenteItem item)
    {
        if (identificacion != item.identificacion)
        {
            return BadRequest();
        }
        _context.Entry(item).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }
    // DELETE: api/Todo/5
    [HttpDelete("{identificacion}")]
    public async Task<IActionResult> DeleteDocente(int identificacion)
    {
        var docente = await
        _context.Docentes.FindAsync(identificacion);
        if (docente == null)
        {
            return NotFound();
        }

        _context.Docentes.Remove(docente);
        await _context.SaveChangesAsync();
        return NoContent();
    }
    //LOGIN
    [HttpGet("user={user}")]
         public async Task<ActionResult<DocenteItem>> GetDocenteByUser(string user)
        {
            //prueba linq
            var docente = await _context.Docentes.FirstOrDefaultAsync(i=>i.user_Name==user);
            if (docente == null)
            {
                return NotFound();
            }
                return docente;
        }
    }
}
