using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Proyecto.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActividadComplementarias",
                columns: table => new
                {
                    cod_Actividad = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    informe_Numero = table.Column<string>(nullable: true),
                    Nombre_Actividad = table.Column<string>(nullable: true),
                    Descripcion = table.Column<string>(nullable: true),
                    Estado_Actividad = table.Column<string>(nullable: true),
                    Fecha_Actividad = table.Column<DateTime>(nullable: false),
                    PlanDeAccion = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActividadComplementarias", x => x.cod_Actividad);
                });

            migrationBuilder.CreateTable(
                name: "Docentes",
                columns: table => new
                {
                    identificacion = table.Column<int>(nullable: false),
                    tipo_Documento = table.Column<string>(nullable: true),
                    primer_Nombre = table.Column<string>(nullable: true),
                    segundo_Nombre = table.Column<string>(nullable: true),
                    primer_Apellido = table.Column<string>(nullable: true),
                    segundo_Apellido = table.Column<string>(nullable: true),
                    fecha_Nacimiento = table.Column<DateTime>(nullable: false),
                    genero = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    telefono = table.Column<long>(nullable: false),
                    cargo = table.Column<string>(nullable: true),
                    estadoSys = table.Column<string>(nullable: true),
                    tipo_Docente = table.Column<string>(nullable: true),
                    user_Name = table.Column<string>(nullable: true),
                    contrasena = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Docentes", x => x.identificacion);
                });

            migrationBuilder.CreateTable(
                name: "Evidencias",
                columns: table => new
                {
                    Cod_Evidencia = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre_Evidencia = table.Column<string>(nullable: true),
                    Tipo_Evidencia = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Evidencias", x => x.Cod_Evidencia);
                });

            migrationBuilder.CreateTable(
                name: "JefeDepartamentos",
                columns: table => new
                {
                    identificacion = table.Column<string>(nullable: false),
                    tipo_Documento = table.Column<string>(nullable: false),
                    primer_Nombre = table.Column<string>(nullable: false),
                    segundo_Nombre = table.Column<string>(nullable: true),
                    primer_Apellido = table.Column<string>(nullable: false),
                    segundo_Apellido = table.Column<string>(nullable: false),
                    fecha_Nacimiento = table.Column<DateTime>(nullable: false),
                    genero = table.Column<string>(nullable: false),
                    email = table.Column<string>(nullable: false),
                    telefono = table.Column<long>(nullable: false),
                    cargo = table.Column<string>(nullable: true),
                    estadoSys = table.Column<string>(nullable: true),
                    tipo_Docente = table.Column<string>(nullable: false),
                    user_Name = table.Column<string>(nullable: false),
                    contrasena = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JefeDepartamentos", x => x.identificacion);
                });

            migrationBuilder.CreateTable(
                name: "TipoActividades",
                columns: table => new
                {
                    cod_TipoActividad = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_Actividad = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoActividades", x => x.cod_TipoActividad);
                });

            migrationBuilder.CreateTable(
                name: "ActividadesAsignadas",
                columns: table => new
                {
                    codigo = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    codTipoActividad = table.Column<string>(nullable: true),
                    DocenteItemId = table.Column<int>(nullable: false),
                    horasAsignadas = table.Column<int>(nullable: false),
                    estado = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActividadesAsignadas", x => x.codigo);
                    table.ForeignKey(
                        name: "FK_ActividadesAsignadas_Docentes_DocenteItemId",
                        column: x => x.DocenteItemId,
                        principalTable: "Docentes",
                        principalColumn: "identificacion",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlanDeAccions",
                columns: table => new
                {
                    codPlanAccion = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    descripcion = table.Column<string>(nullable: true),
                    fecha_Inicio = table.Column<DateTime>(nullable: false),
                    idActividadAsignada = table.Column<int>(nullable: false),
                    ActividadAsignadacodigo = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlanDeAccions", x => x.codPlanAccion);
                    table.ForeignKey(
                        name: "FK_PlanDeAccions_ActividadesAsignadas_ActividadAsignadacodigo",
                        column: x => x.ActividadAsignadacodigo,
                        principalTable: "ActividadesAsignadas",
                        principalColumn: "codigo",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Acciones",
                columns: table => new
                {
                    codAccion = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombreAccion = table.Column<string>(nullable: true),
                    planAccionId = table.Column<int>(nullable: false),
                    PlanDeAccioncodPlanAccion = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Acciones", x => x.codAccion);
                    table.ForeignKey(
                        name: "FK_Acciones_PlanDeAccions_PlanDeAccioncodPlanAccion",
                        column: x => x.PlanDeAccioncodPlanAccion,
                        principalTable: "PlanDeAccions",
                        principalColumn: "codPlanAccion",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Acciones_PlanDeAccioncodPlanAccion",
                table: "Acciones",
                column: "PlanDeAccioncodPlanAccion");

            migrationBuilder.CreateIndex(
                name: "IX_ActividadesAsignadas_DocenteItemId",
                table: "ActividadesAsignadas",
                column: "DocenteItemId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanDeAccions_ActividadAsignadacodigo",
                table: "PlanDeAccions",
                column: "ActividadAsignadacodigo");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Acciones");

            migrationBuilder.DropTable(
                name: "ActividadComplementarias");

            migrationBuilder.DropTable(
                name: "Evidencias");

            migrationBuilder.DropTable(
                name: "JefeDepartamentos");

            migrationBuilder.DropTable(
                name: "TipoActividades");

            migrationBuilder.DropTable(
                name: "PlanDeAccions");

            migrationBuilder.DropTable(
                name: "ActividadesAsignadas");

            migrationBuilder.DropTable(
                name: "Docentes");
        }
    }
}
