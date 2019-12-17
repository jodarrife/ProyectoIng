using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DocenteSharpHTTP.Models
{
    public class AccionesItem
    {/* */
        [Key]
        public int IdAccion { get; set; }
        public string nombreAccion { get; set; }
        public int PlanAccionesId { get; set; }
    }
}