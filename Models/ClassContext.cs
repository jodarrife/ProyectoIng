using Microsoft.EntityFrameworkCore;
namespace DocenteSharpHTTP.Models
{
    public class ClassContext : DbContext
    {
        public ClassContext(DbContextOptions<ClassContext> options) :
        base(options)
        {
        }
        public DbSet<DocenteItem> Docentes { get; set; }
        public DbSet<AccionesItem> Acciones { get; set; }
        public DbSet<ActividadAsignada> ActividadesAsignadas { get; set; }
        public DbSet<JefeDepartamento> JefeDepartamentos { get; set; }
        public DbSet<PlanAcciones> Planes { get; set; }
        public DbSet<Evidencia> Evidencias { get; set; }
        public DbSet<ActividadComplementaria> ActividadComplementarias { get; set; }
        public DbSet<TipoActividad> TipoActividades { get; set; }
    }

}