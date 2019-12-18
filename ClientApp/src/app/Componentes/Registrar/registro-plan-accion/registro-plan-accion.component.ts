import { Component, OnInit } from '@angular/core';
import { TipoActividadService } from '../../services/tipo-actividad.service';
import { TipoActividad } from 'src/app/models/tipo-actividad';
import { Docente } from 'src/app/models/docente';
import { DocenteService } from '../../services/docente.service';
import { AccionesService } from '../../services/acciones.service';
import { Acciones } from 'src/app/models/acciones';
import { ActividadAsignada } from 'src/app/models/actividad-asignada';
import { PlanAcciones } from 'src/app/models/plan-acciones';
import { ActividadAsignadaService } from '../../services/actividad-asignada.service';
import { PlanAccionesService } from '../../services/plan-acciones.service';
import { isUndefined } from "util";
import { Location } from "@angular/common";


@Component({
  selector: 'app-registro-plan-accion',
  templateUrl: './registro-plan-accion.component.html',
  styleUrls: ['./registro-plan-accion.component.css']
})
export class RegistroPlanAccionComponent implements OnInit {
  actividades: ActividadAsignada[];
  actividad: ActividadAsignada;
  docente: Docente;
  accion: Acciones;
  accioness: Acciones[];
  plan: PlanAcciones;
  yaExiste: boolean;
  constructor(
    private actividadService: ActividadAsignadaService,
    private docenteService: DocenteService,
    private accionService: AccionesService,
    private planService: PlanAccionesService,
    private location: Location
  ) {}

  ngOnInit() {
    this.accion = { idAccion: null, nombreAccion: "" };
    this.getDocente();
    this.getActividades();
  }
  getDocente() {
    this.docente = this.docenteService.getDocenteLS();
  }
  getActividades() {
    this.actividadService
      .getActividadesDocente(this.docente.identificacion)
      .subscribe(actividades => {
        this.actividades = actividades;
        console.log(this.actividades);
        if (this.actividades.length <= 0) {
          alert("El docente no tiene actividades asignadas");
        }
      });
  }
  getActividad() {
    var id = Number.parseInt(
      (document.getElementById("actividades") as HTMLInputElement).value
    );
    this.actividadService.get(id).subscribe(actividad => {
      this.actividad = actividad;
    });
  }
  addAccion() {
    if (!isUndefined(this.actividad)) {
      var id = Number.parseInt(
        (document.getElementById("actividades") as HTMLInputElement).value
      );

      this.planService.getPlanByActividad(id).subscribe(plan => {
        this.plan = plan;
        console.log(this.plan);
        if (isUndefined(this.plan)) {
          if (this.accion.nombreAccion.trim() != "") {
            this.accion.idAccion = 0;
            this.accionService.addAcciones(this.accion);
            this.accion.nombreAccion = "";
            this.accioness = this.accionService.getAcciones();
          } else {
            alert("Digite una descripcion");
          }
        } else {
          alert("Ya existe un plan de acciones para esta actividad");
        }
      });
    } else {
      alert("Seleccione una actividad");
    }
  }

  validarAddPlan() {
    if (!isUndefined(this.actividad)) {
      var id = Number.parseInt(
        (document.getElementById("actividades") as HTMLInputElement).value
      );
//obtengo el plan
      this.planService.getPlanByActividad(id).subscribe(plan => {
        this.plan = plan;
        console.log(this.plan);
        //si es indefinido agrego
        if (isUndefined(this.plan)) {
          this.addPlan();
        } else {
          alert("Ya existe un plan de acciones para esta actividad");
        }
      });
    } else {
      alert("Seleccione una actividad");
    }
  }
  addPlan() {
    this.getAcciones();
    if (this.accioness.length <= 0) {
      alert("Debe agregar las acciones a realizar");
    } else {
      this.plan = new PlanAcciones();
      this.plan.idPlanAcciones = 0;
      this.plan.accioness = this.accioness;
      this.plan.actividad = this.actividad;
      var fecha =
        new Date().getMonth() +
        1 +
        "/" +
        new Date().getDate() +
        "/" +
        new Date().getFullYear();
      this.plan.fecha = new Date(fecha);
      alert(JSON.stringify(this.plan));
      this.planService.addPlan(this.plan).subscribe(rest => {
        this.actividad.estado = "Planeada";
        this.actividadService.update(this.actividad).subscribe();
        this.accionService.eliminarAcciones();
        this.getAcciones();
      });
    }
  }
  getAcciones() {
    this.accioness = this.accionService.getAcciones();
  }
  eliminarAccion(accion: Acciones) {
    this.accionService.deleteAccion(accion);
    this.getAcciones();
  }
  goBack(): void {
    this.location.back();
  }
}