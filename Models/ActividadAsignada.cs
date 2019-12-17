using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
///<Summary>
/// Se coloca TaskItem a la Clase en lugar de Task,porque Task es una palabra Reservada de .NetCore
/// </Summary>
///
namespace DocenteSharpHTTP.Models
{
    public class ActividadAsignada
    {
        [Key]
        public int codigoActividad { get; set; }
        public string nombreActividad { get; set; }
       // public TipoActividad TipoActividad { get; set; }
        public int DocenteItemId { get; set; }
        [ForeignKey("DocenteItemId")]
        public DocenteItem DocenteItem { get; set; }
        public int horasAsignadas { get; set; }
        public string estado { get; set; }


    }
}