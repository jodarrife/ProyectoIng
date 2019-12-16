﻿// <auto-generated />
using System;
using DocenteSharpHTTP.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Proyecto.Migrations
{
    [DbContext(typeof(ClassContext))]
    partial class ClassContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DocenteSharpHTTP.Models.AccionesItem", b =>
                {
                    b.Property<int>("codAccion")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("PlanDeAccioncodPlanAccion")
                        .HasColumnType("int");

                    b.Property<string>("nombreAccion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("planAccionId")
                        .HasColumnType("int");

                    b.HasKey("codAccion");

                    b.HasIndex("PlanDeAccioncodPlanAccion");

                    b.ToTable("Acciones");
                });

            modelBuilder.Entity("DocenteSharpHTTP.Models.ActividadAsignada", b =>
                {
                    b.Property<int>("codigo")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("DocenteItemId")
                        .HasColumnType("int");

                    b.Property<string>("estado")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("horasAsignadas")
                        .HasColumnType("int");

                    b.HasKey("codigo");

                    b.HasIndex("DocenteItemId");

                    b.ToTable("ActividadesAsignadas");
                });

            modelBuilder.Entity("DocenteSharpHTTP.Models.ActividadComplementaria", b =>
                {
                    b.Property<int>("cod_Actividad")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Estado_Actividad")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Fecha_Actividad")
                        .HasColumnType("datetime2");

                    b.Property<string>("Nombre_Actividad")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PlanDeAccion")
                        .HasColumnType("int");

                    b.Property<string>("informe_Numero")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("cod_Actividad");

                    b.ToTable("ActividadComplementarias");
                });

            modelBuilder.Entity("DocenteSharpHTTP.Models.DocenteItem", b =>
                {
                    b.Property<int>("identificacion")
                        .HasColumnType("int");

                    b.Property<string>("cargo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("contrasena")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("estadoSys")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("fecha_Nacimiento")
                        .HasColumnType("datetime2");

                    b.Property<string>("genero")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("primer_Apellido")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("primer_Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("segundo_Apellido")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("segundo_Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("telefono")
                        .HasColumnType("bigint");

                    b.Property<string>("tipo_Docente")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("tipo_Documento")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("user_Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("identificacion");

                    b.ToTable("Docentes");
                });

            modelBuilder.Entity("DocenteSharpHTTP.Models.Evidencia", b =>
                {
                    b.Property<int>("Cod_Evidencia")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nombre_Evidencia")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Tipo_Evidencia")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Cod_Evidencia");

                    b.ToTable("Evidencias");
                });

            modelBuilder.Entity("DocenteSharpHTTP.Models.JefeDepartamento", b =>
                {
                    b.Property<string>("identificacion")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("cargo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("contrasena")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("estadoSys")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("fecha_Nacimiento")
                        .HasColumnType("datetime2");

                    b.Property<string>("genero")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("primer_Apellido")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("primer_Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("segundo_Apellido")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("segundo_Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("telefono")
                        .HasColumnType("bigint");

                    b.Property<string>("tipo_Docente")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("tipo_Documento")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("user_Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("identificacion");

                    b.ToTable("JefeDepartamentos");
                });

            modelBuilder.Entity("DocenteSharpHTTP.Models.PlanDeAccion", b =>
                {
                    b.Property<int>("codPlanAccion")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ActividadAsignadacodigo")
                        .HasColumnType("int");

                    b.Property<string>("descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("fecha_Inicio")
                        .HasColumnType("datetime2");

                    b.Property<int>("idActividadAsignada")
                        .HasColumnType("int");

                    b.HasKey("codPlanAccion");

                    b.HasIndex("ActividadAsignadacodigo");

                    b.ToTable("PlanDeAccions");
                });

            modelBuilder.Entity("DocenteSharpHTTP.Models.TipoActividad", b =>
                {
                    b.Property<int>("cod_TipoActividad")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("nombre_Actividad")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("cod_TipoActividad");

                    b.ToTable("TipoActividades");
                });

            modelBuilder.Entity("DocenteSharpHTTP.Models.AccionesItem", b =>
                {
                    b.HasOne("DocenteSharpHTTP.Models.PlanDeAccion", null)
                        .WithMany("acciones")
                        .HasForeignKey("PlanDeAccioncodPlanAccion");
                });

            modelBuilder.Entity("DocenteSharpHTTP.Models.ActividadAsignada", b =>
                {
                    b.HasOne("DocenteSharpHTTP.Models.DocenteItem", "DocenteItem")
                        .WithMany()
                        .HasForeignKey("DocenteItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DocenteSharpHTTP.Models.PlanDeAccion", b =>
                {
                    b.HasOne("DocenteSharpHTTP.Models.ActividadAsignada", "ActividadAsignada")
                        .WithMany()
                        .HasForeignKey("ActividadAsignadacodigo");
                });
#pragma warning restore 612, 618
        }
    }
}
