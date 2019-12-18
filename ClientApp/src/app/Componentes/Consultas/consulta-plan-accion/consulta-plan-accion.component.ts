import { Component, OnInit } from '@angular/core';
import { ActividadAsignada } from 'src/app/models/actividad-asignada';
import { Docente } from 'src/app/models/docente';
import { PlanAcciones } from 'src/app/models/plan-acciones';

import { ActividadAsignadaService } from '../../services/actividad-asignada.service';
import { DocenteService } from '../../services/docente.service';

import { PlanAccionesService } from '../../services/plan-acciones.service';


@Component({
  selector: 'app-consulta-plan-accion',
  templateUrl: './consulta-plan-accion.component.html',
  styleUrls: ['./consulta-plan-accion.component.css']
})
export class ConsultaPlanAccionComponent implements OnInit {

  docente: Docente;

  actividadesAsignadas: ActividadAsignada[];
  planes: PlanAcciones[];

  constructor(
    private actAsignadasService: ActividadAsignadaService,
    private docentyeService: DocenteService,
    private planService: PlanAccionesService
  ) { }

  ngOnInit() {
    this.getDocente();
    this.getPlanes();
  }
  getPlanes() {
    this.actAsignadasService.getActividadesDocente(this.docente.identificacion).subscribe(actividadesAsignadas => {
      this.actividadesAsignadas = actividadesAsignadas;
      //console.log(this.actividadesAsignadas);
      if (this.actividadesAsignadas.length <= 0) {
        alert("El docente no tiene actividades asignadas");
      }
    });
  }
  getDocente() {
    this.docente = this.docentyeService.getDocenteLS();
  }
}