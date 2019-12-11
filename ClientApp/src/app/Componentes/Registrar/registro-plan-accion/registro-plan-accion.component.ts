import { Component, OnInit } from '@angular/core';
import { TipoActividadService } from '../../services/tipo-actividad.service';
import { TipoActividad } from 'src/app/models/tipo-actividad';
import { Docente } from 'src/app/models/docente';
import { DocenteService } from '../../services/docente.service';
import { AccionesService } from '../../services/acciones.service';
import { Acciones } from 'src/app/models/acciones';

@Component({
  selector: 'app-registro-plan-accion',
  templateUrl: './registro-plan-accion.component.html',
  styleUrls: ['./registro-plan-accion.component.css']
})
export class RegistroPlanAccionComponent implements OnInit {

  tipoActividad: TipoActividad[];
  docentes:Docente[];
  acciones: Acciones[];

  constructor(
    private tipoActividadService: TipoActividadService,
    private docenteService:DocenteService,
    private accionesService: AccionesService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.tipoActividadService.getAll().subscribe(tipoActividad => {this.tipoActividad = tipoActividad});
    this.docenteService.getAll().subscribe(docentes=>this.docentes=docentes);
    this.accionesService.getAll().subscribe(acciones => this.acciones = acciones);
  }
}
