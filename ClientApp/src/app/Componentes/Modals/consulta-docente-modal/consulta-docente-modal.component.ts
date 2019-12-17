import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Docente } from 'src/app/models/docente';

@Component({
  selector: 'app-consulta-docente-modal',
  templateUrl: './consulta-docente-modal.component.html',
  styleUrls: ['./consulta-docente-modal.component.css']
})
export class ConsultaDocenteModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  actualizar(docente: Docente) {
    this.activeModal.close(docente);
  }
}
