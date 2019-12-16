using System;
using System.Data;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace DocenteSharpHTTP.Models
{
    public class PlanDeAccion
    {
        [Key]
        public int codPlanAccion { get; set; }
        public List<AccionesItem> acciones { get; set; }
        public string descripcion { get; set; }
        public DateTime fecha_Inicio { get; set; }
        public int idActividadAsignada { get; set; }
        public ActividadAsignada ActividadAsignada { get; set; }

        
    }
}