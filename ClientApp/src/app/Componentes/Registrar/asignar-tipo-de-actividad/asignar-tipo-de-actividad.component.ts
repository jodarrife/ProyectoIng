import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../../services/docente.service';
import { Docente } from '../../../models/docente';
import { TipoActividadService } from '../../services/tipo-actividad.service';
import { TipoActividad } from '../../../models/tipo-actividad';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { FormGroup } from '@angular/forms';

import { AlertModalComponent } from '../../Errores/@base/modals/alert-modal/alert-modal.component';
import { JefeDepartamentoService } from '../../services/jefe-departamento.service';

@Component({
  selector: 'app-asignar-tipo-de-actividad',
  templateUrl: './asignar-tipo-de-actividad.component.html',
  styleUrls: ['./asignar-tipo-de-actividad.component.css']
})
export class AsignarTipoDeActividadComponent implements OnInit {

  tipoActividad: TipoActividad[];
  docentes: Docente[];
  registerForm: FormGroup;
  tipoAct: TipoActividad;
  submitted = false;


  constructor(
    private docenteService: DocenteService,
    private tipoActividadService: TipoActividadService,
    private jefe: JefeDepartamentoService,
    private modalService: NgbModal) { }

  public identificacion2: Number;
  ngOnInit() {
    //llama los get
    this.getAll();
    this.getTipoAc();
    //selecciona
    $(document).ready(function(){
      $('input[type="checkbox"]').change(function(){
          if($(this).is(':checked')){
              $('input[type="checkbox"]').not(this).prop('checked', false);

          var tr = $(this).closest('tr');

          var Selección = $(tr).find('td:nth-child(1)').text();
          var tipo_Documento = $(tr).find('td:nth-child(2)').text();
          var identificacion = $(tr).find('td:nth-child(3)').text();
          var primer_Nombre = $(tr).find('td:nth-child(4)').text();
          var primer_Apellido = $(tr).find('td:nth-child(5)').text();
          var email = $(tr).find('td:nth-child(6)').text();
          var telefono = $(tr).find('td:nth-child(7)').text();
          var estadoSys = $(tr).find('td:nth-child(8)').text();
          var tipo_Docente = $(tr).find('td:nth-child(9)').text();

          sessionStorage.setItem('identificacion', identificacion);
          this.CCdoc();
        }
      })
    })




  }
  //lleno las tablas
  //combo
  getTipoAc() {
    this.tipoActividadService.getAll().subscribe(tipoActividad => { this.tipoActividad = tipoActividad });
  }
  mostrarTipoA() {
    var num1 = ((document.getElementById("referencia") as HTMLInputElement).value);
    if (num1 != "Seleccione...") {
      this.tipoActividadService.get(parseInt(num1))
        .subscribe(tipoAc => {
          this.tipoAct = tipoAc
        });
    }
  }
  //DOC
  //obtento el name
  getUserNameDoc(): string {
    return sessionStorage.getItem('identificacion') != null ? sessionStorage.getItem('identificacion') : 'Nohay';
  }
  //mando el name 
  CCdoc(): string {
    return this.getUserNameDoc();
  }
  logoutDoc() {
    this.jefe.isJefeDpto.next(false);
    sessionStorage.removeItem('identificacion');
  }

  //lleno las tablas

  getAll() {
    this.docenteService.getAll().subscribe(docentes => this.docentes = docentes);
    this.tipoActividadService.getAll().subscribe(tipoActividad => { this.tipoActividad = tipoActividad });
  }

}