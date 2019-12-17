import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../../services/docente.service';
import { Docente } from '../../../models/docente';
import { TipoActividadService } from '../../services/tipo-actividad.service';
import { TipoActividad } from '../../../models/tipo-actividad';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaDocenteModalComponent } from '../../Modals/consulta-docente-modal/consulta-docente-modal.component'
import { AlertModalComponent } from '../../Errores/@base/modals/alert-modal/alert-modal.component';
import { JefeDepartamentoService } from '../../services/jefe-departamento.service';
import { isUndefined } from "util";

@Component({
  selector: 'app-asignar-tipo-de-actividad',
  templateUrl: './asignar-tipo-de-actividad.component.html',
  styleUrls: ['./asignar-tipo-de-actividad.component.css']
})
export class AsignarTipoDeActividadComponent implements OnInit {

  tipoActividad: TipoActividad[];
  docente: Docente;
  registerForm: FormGroup;
  tipoAct: TipoActividad;
  submitted = false;
  haveDocente: boolean;

  constructor(
    private docenteService: DocenteService,
    private tipoActividadService: TipoActividadService,
    private formBuilder: FormBuilder,
    private jefe: JefeDepartamentoService,
    private modalService: NgbModal) { }


  ngOnInit() {
    this.getTipoAc();
    this.registerForm = this.formBuilder.group({
      identificacion: [''],
      primer_Nombre: [''],
      segundo_Nombre: [''],
      primer_Apellido: [''],
      telefono: [''],
      email: [''],
      tipo_Docente: [''],
     
      
  });
  }

  //llenar el comboBox
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

  //actividad por docente
  getActividadesDocente(id: number) {
    this.tipoActividadService
      .getActividadesDocente(id)
      .subscribe(tipoActividad => (this.tipoActividad = tipoActividad));
  }
  /*buscar el docente
  getDocente() {
    if (this.docente.identificacion != null) {
      var id = Number.parseInt(
        (document.getElementById("identificacion") as HTMLInputElement).value
      );
      this.docenteService.get(id).subscribe(docente => {
        this.docente = docente;
        if (isUndefined(this.docente)) {
          this.docente = {
            nombres: "",
            apellidos: "",
            idDocente: null,
            sexo: "",
            email: "",
            telefono: ,
            password:"",
            usuario:""
          };
          this.tipoActividad=null;
          this.haveDocente = false;
        } else {
          this.getActividadesDocente(this.docente.idDocente);
          this.haveDocente = true;
        }
      });
    }
  }*/


 // convenience getter for easy access to form fields
 get f() { return this.registerForm.controls; }
  
 buscarCliente() {
     this.docenteService.get(this.registerForm.value.identificacion).subscribe(docente => {
         if (docente != null) {
             this.f['identificacion'].setValue(docente.identificacion);
             this.f['primer_Nombre'].setValue(docente.primer_Nombre);
             this.f['segundo_Nombre'].setValue(docente.segundo_Nombre);
             this.f['primer_Apellido'].setValue(docente.primer_Apellido);
             this.f['telefono'].setValue(docente.telefono);
             this.f['email'].setValue(docente.email);
             this.f['tipo_Docente'].setValue(docente.tipo_Docente);
         }
         else
         {
             this.openModalCliente();
         }
     });
 }
  //Manejo Modal
  openModalCliente()
  {
      this.modalService.open(ConsultaDocenteModalComponent, { size: 'lg' }).result.then((docente) => this.actualizar(docente));
  }

  actualizar(docente: Docente) {
      
      this.registerForm.controls['identificacion'].setValue(docente.identificacion);
      this.registerForm.controls['primer_Nombre'].setValue(docente.primer_Nombre);
      this.registerForm.controls['segundo_Nombre'].setValue(docente.segundo_Nombre);
      this.registerForm.controls['primer_Apellido'].setValue(docente.primer_Apellido);
      this.registerForm.controls['telefono'].setValue(docente.telefono);
      this.registerForm.controls['email'].setValue(docente.email);
      this.registerForm.controls['tipo_Docente'].setValue(docente.tipo_Docente);
      
  }
  //Fin Manejo Modal
}