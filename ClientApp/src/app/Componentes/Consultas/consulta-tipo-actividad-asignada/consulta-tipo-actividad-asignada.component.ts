import { Component, OnInit } from '@angular/core';
import { ActividadAsignada } from 'src/app/models/actividad-asignada';
import { ActividadAsignadaService } from '../../services/actividad-asignada.service';

@Component({
  selector: 'app-consulta-tipo-actividad-asignada',
  templateUrl: './consulta-tipo-actividad-asignada.component.html',
  styleUrls: ['./consulta-tipo-actividad-asignada.component.css']
})
export class ConsultaTipoActividadAsignadaComponent implements OnInit {
  actAsig:ActividadAsignada[];
  constructor(private actAsigService:ActividadAsignadaService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.actAsigService.getAll().subscribe(actAsig=>this.actAsig=actAsig);
  }
}
