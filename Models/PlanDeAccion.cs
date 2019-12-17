using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace DocenteSharpHTTP.Models
{
    public class PlanAcciones
    {
        [Key]
        public int IdPlanAcciones { get; set; }
        public List<AccionesItem> Acciones { get; set; }
        public DateTime Fecha { get; set; }
        public int ActividadId { get; set; }
        public ActividadAsignada ActividadAsignada { get; set; }

    }
}