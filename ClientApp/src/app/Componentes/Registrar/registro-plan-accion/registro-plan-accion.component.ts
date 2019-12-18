import { Component, OnInit } from '@angular/core';
import { TipoActividadService } from '../../services/tipo-actividad.service';
import { TipoActividad } from 'src/app/models/tipo-actividad';
import { Docente } from 'src/app/models/docente';
import { DocenteService } from '../../services/docente.service';
import { AccionesService } from '../../services/acciones.service';
import { Acciones } from 'src/app/models/acciones';
import { ActividadAsignada } from 'src/app/models/actividad-asignada';
import { PlanAccion } from 'src/app/models/plan-de-accion';
import { ActividadAsignadaService } from '../../services/actividad-asignada.service';
import { PlanDeAccionService } from '../../services/plan-de-accion.service';
import { isUndefined } from "util";
import { Location } from "@angular/common";


@Component({
  selector: 'app-registro-plan-accion',
  templateUrl: './registro-plan-accion.component.html',
  styleUrls: ['./registro-plan-accion.component.css']
})
export class RegistroPlanAccionComponent implements OnInit {


  acciones: Acciones[];
  actividadAsignadas: ActividadAsignada[];
  actividadAsignada: ActividadAsignada;
  docente: Docente;
  accion: Acciones;
  plan: PlanAccion;
  yaExiste: boolean;


  constructor(
    private ActividadAsignadaService: ActividadAsignadaService,
    private docenteService: DocenteService,
    private accionesService: AccionesService,
    private planService: PlanDeAccionService,
    private location: Location
  ) { }

  ngOnInit() {
    this.accion = { idAccion: null, nombreAccion: "" };
    this.getDocente();
    this.getActividades();
  }
  //llenar el combobox
  getDocente() {
    this.docente = this.docenteService.getDocenteLS();
  }

  getActividades() {
    this.ActividadAsignadaService
      .getActividadesDocente(this.docente.identificacion)
      .subscribe(actividadAsignadas => {
        this.actividadAsignadas = actividadAsignadas;
        console.log(this.actividadAsignadas);
        if (this.actividadAsignadas.length <= 0) {
          alert("El docente no tiene actividades asignadas");
        }
      });
  }
  getActividad() {
    var id = (
      (document.getElementById("actividades") as HTMLInputElement).value
    );
      this.ActividadAsignadaService.get(parseInt(id)).subscribe(actividadAsignada => {
        this.actividadAsignada = actividadAsignada;
      });
  }
  //agregar al session
  addAccion() {
    if (!isUndefined(this.actividadAsignada)) {
      var id = Number.parseInt(
        (document.getElementById("actividades") as HTMLInputElement).value
      );
      this.planService.getPlanPorActividad(id).subscribe(plan => {
        this.plan = plan;
        console.log(this.plan);
        if (isUndefined(this.plan)) {
          if (this.accion.nombreAccion.trim() != "") {
            this.accion.idAccion = 0;
            this.accionesService.addAcciones(this.accion);
            this.accion.nombreAccion = "";
            this.acciones = this.accionesService.getAcciones();
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
    if (!isUndefined(this.actividadAsignada)) {
      var id = Number.parseInt(
        (document.getElementById("actividades") as HTMLInputElement).value
      );
      //obtengo el plan
      this.planService.getPlanPorActividad(id).subscribe(plan => {
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
    if (this.acciones.length <= 0) {
      alert("Debe agregar las acciones a realizar");
    } else {
      this.plan = new PlanAccion();
      this.plan.idPlanAcciones = 0;
      this.plan.acciones = this.acciones;
      this.plan.actividad = this.actividadAsignada;
      var fecha =
        new Date().getMonth() +
        1 +
        "/" +
        new Date().getDate() +
        "/" +
        new Date().getFullYear();
      this.plan.fecha = new Date(fecha);
      console.log(JSON.stringify(this.plan));
      this.planService.addPlanAccion(this.plan).subscribe(rest => {
        this.actividadAsignada.estado = "Planeada";
        this.ActividadAsignadaService.update(this.actividadAsignada).subscribe();
        this.accionesService.eliminarAcciones();
        this.getAcciones();
      });
    }
  }
  eliminarAccion(accion: Acciones) {
    this.accionesService.deleteAccion(accion);
    this.getAcciones();
  }
  getAcciones() {
    this.acciones = this.accionesService.getAcciones();
  }
  goBack(): void {
    this.location.back();
  }
}