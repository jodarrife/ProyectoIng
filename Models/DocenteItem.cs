using Newtonsoft.Json;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using Newtonsoft.Json;
///<Summary>
/// </Summary>
namespace DocenteSharpHTTP.Models
{
    public class DocenteItem
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Key]
        [JsonProperty("identificacion")]
        public int identificacion { get; set; }
        public string tipo_Documento { get; set; }

        [MinLength(2)]
        public string primer_Nombre { get; set; }
        [MinLength(2)]
        public string segundo_Nombre { get; set; }
        [MinLength(2)]
        public string primer_Apellido { get; set; }
        [MinLength(2)]
        public string segundo_Apellido { get; set; }
        public DateTime fecha_Nacimiento { get; set; }
        public string genero { get; set; }
        [EmailAddress]
        public string email { get; set; }

        public uint telefono { get; set; }
        private string _Cargo = "DOCENTE";
        public string cargo { get { return this._Cargo; } set { this._Cargo = value; } }
        private string _Estado = "ACTIVO";
        public string estadoSys { get { return this._Estado; } set { this._Estado = value; } } //estado en el sistema
        public string tipo_Docente { get; set; }
        public string user_Name { get; set; }
        public string contrasena { get; set; }


    }
}