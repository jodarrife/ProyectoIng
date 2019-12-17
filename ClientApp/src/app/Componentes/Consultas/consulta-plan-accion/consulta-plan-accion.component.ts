import { Component, OnInit } from '@angular/core';
import { ActividadAsignada } from 'src/app/models/actividad-asignada';
import { Docente } from 'src/app/models/docente';
import { PlanAccion } from 'src/app/models/plan-de-accion';
import { ActividadAsignadaService } from '../../services/actividad-asignada.service';
import { DocenteService } from '../../services/docente.service';
import { PlanDeAccionService } from '../../services/plan-de-accion.service';

@Component({
  selector: 'app-consulta-plan-accion',
  templateUrl: './consulta-plan-accion.component.html',
  styleUrls: ['./consulta-plan-accion.component.css']
})
export class ConsultaPlanAccionComponent implements OnInit {


  docente: Docente;
  actividadesAsignadas: ActividadAsignada[];
  planes: PlanAccion[];

  constructor(
    private actAsignadasService: ActividadAsignadaService,
    private docentyeService: DocenteService,
    private planService: PlanDeAccionService
  ) { }

  ngOnInit() {
    this.getDocente();
    this.getPlanes();
  }
  getPlanes() {
    this.planService.getPlanesByDocente(this.docente.identificacion).subscribe(planes => {
      this.planes = planes
      console.log(this.planes);
    });
  }
  getDocente() {
    this.docente = this.docentyeService.getDocenteLS();
  }
}
