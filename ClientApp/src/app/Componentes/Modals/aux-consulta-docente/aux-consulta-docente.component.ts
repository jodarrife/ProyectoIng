import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DocenteService } from '../../services/docente.service';
import { Docente } from '../../../models/docente';

@Component({
  selector: 'app-aux-consulta-docente',
  templateUrl: './aux-consulta-docente.component.html',
  styleUrls: ['./aux-consulta-docente.component.css']
})
export class AuxConsultaDocenteComponent implements OnInit {

  docentes: Docente[];
  searchText: string;
  @Output() seleccionado = new EventEmitter<Docente>();

  constructor(private docenteService: DocenteService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.docenteService.getAll().subscribe(docentes => {this.docentes = docentes; this.searchText});
  }

  seleccionar(docente: Docente) {
    this.seleccionado.emit(docente);
  }
}
