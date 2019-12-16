using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
///<Summary>
/// Se coloca TaskItem a la Clase en lugar de Task,porque Task es una palabra Reservada de .NetCore
/// </Summary>
///
namespace DocenteSharpHTTP.Models
{
    public class AccionesItem
    {/* */
        [Key]
        public int codAccion { get; set; }
        public string nombreAccion { get; set; }
        public int planAccionId { get; set; }
    }
}