import { Component, OnInit } from '@angular/core';
import { PlanAcciones } from 'src/app/models/plan-acciones';

import { ActividadAsignada } from 'src/app/models/actividad-asignada';
import { Docente } from 'src/app/models/docente';

import { PlanAccionesService } from '../../services/plan-acciones.service';
import { ActivatedRoute } from '@angular/router';
import { ActividadAsignadaService } from '../../services/actividad-asignada.service';
import { DocenteService } from '../../services/docente.service';
import { isUndefined } from "util";
import { Location } from "@angular/common";


@Component({
  selector: 'app-modificar-plan-accion',
  templateUrl: './modificar-plan-accion.component.html',
  styleUrls: ['./modificar-plan-accion.component.css']
})
export class ModificarPlanAccionComponent implements OnInit {

  plan:PlanAcciones;
  actividad:ActividadAsignada;
  docente:Docente;
  
    constructor(
      private planService:PlanAccionesService,
      private route: ActivatedRoute,
      private location:Location,
      private actividadService:ActividadAsignadaService,
      private docenteService:DocenteService
      
      ) { }
  
    ngOnInit() {
  
      this.plan={accioness:[],actividad:null,fecha:null,idPlanAcciones:0}
      this.getPlan();
    }
    getPlan(): void {
      const id = +this.route.snapshot.paramMap.get("idActividad");
      this.planService.getPlanByActividad(id).subscribe(plan => {
        (this.plan = plan);
        this.docente=this.docenteService.getDocenteLS();
        if(this.docente.identificacion!=this.plan.actividad.docente.identificacion){
          this.goBack();
        }
   
      });
    }
    /*update(): void {
      this.docenteService.update(this.docente).subscribe(() => this.goBack());
    }*/
    deletePlan(): void {
      this.actividad=this.plan.actividad;
      this.planService.delete(this.plan).subscribe(() => {
        this.actividad.estado='Asignada';
        this.actividadService.update(this.actividad).subscribe();
        this.goBack()});
  
    }
    goBack(): void {
      this.location.back();
    }
  
}
