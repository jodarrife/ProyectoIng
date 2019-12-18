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
import { ParsedVariable } from '@angular/compiler';
import { ActividadAsignada } from 'src/app/models/actividad-asignada';
import { ActividadAsignadaService } from '../../services/actividad-asignada.service';

@Component({
  selector: 'app-asignar-tipo-de-actividad',
  templateUrl: './asignar-tipo-de-actividad.component.html',
  styleUrls: ['./asignar-tipo-de-actividad.component.css']
})
export class AsignarTipoDeActividadComponent implements OnInit {

  tipoActividad: TipoActividad[];
  actividadAsignada: ActividadAsignada;
  docente: Docente;
  registerForm: FormGroup;
  tipoAct: TipoActividad;
  submitted = false;
  haveDocente: boolean;
  actAsig:ActividadAsignada[];

  constructor(
    private docenteService: DocenteService,
    private tipoActividadService: TipoActividadService,
    private formBuilder: FormBuilder,
    private jefe: JefeDepartamentoService,
    private modalService: NgbModal,
    private actividadAsignadaService: ActividadAsignadaService ) { }


  ngOnInit() {
    this.getAll();
    this.getTipoAc();
    this.registerForm = this.formBuilder.group({
      identificacion: [''],
      primer_Nombre: [''],
      segundo_Nombre: [''],
      primer_Apellido: [''],
      telefono: [''],
      email: [''],
      tipo_Docente: [''],
      tipo_Actividad: [''],
      hora: ['']
    });


    //mapeo
    this.docente = {
      tipo_Documento: "",
      identificacion: null,
      primer_Nombre: "",
      segundo_Nombre: "",
      primer_Apellido: "",
      segundo_Apellido: "",
      fecha_Nacimiento: null,
      genero: "",
      email: "",
      telefono: parseInt(""),
      cargo: "",
      estadoSys: "",
      user_Name: "",
      contrasena: "",
      tipo_Docente: ""
    };

    this.haveDocente = false;
    this.actividadAsignada = {
      idActividad: 0,
      nombreActividad: "",
      docenteItemId: null,
      docente: this.docente,
      horasAsignadas: null,
      estado: ""
    };
  }
  getAll(){
    this.actividadAsignadaService.getAll().subscribe(actAsig=>this.actAsig=actAsig);
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
        alert(this.tipoAct)
    }
  }

  


  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  buscarCliente() {
    this.docenteService.get2(this.registerForm.value.identificacion).subscribe(docente => {
      if (docente != null) {
        this.f['identificacion'].setValue(docente.identificacion);
        this.f['primer_Nombre'].setValue(docente.primer_Nombre);
        this.f['segundo_Nombre'].setValue(docente.segundo_Nombre);
        this.f['primer_Apellido'].setValue(docente.primer_Apellido);
        this.f['telefono'].setValue(docente.telefono);
        this.f['email'].setValue(docente.email);
        this.f['tipo_Docente'].setValue(docente.tipo_Docente);
      }
      else {
        this.openModalCliente();
      }
    });
  }
  //Manejo Modal
  openModalCliente() {
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


  //agregar 
  addActividad() {
    if (this.registerForm.value.hora> 1){
      if (this.actividadAsignada.horasAsignadas != null && this.actividadAsignada.nombreActividad != null) {
        if (this.haveDocente==false) {
          this.actividadAsignada.nombreActividad= this.registerForm.value.tipo_Actividad;
          this.actividadAsignada.docenteItemId= this.registerForm.value.identificacion;
          //this.actividadAsignada.docente = this.docente;
          this.actividadAsignada.horasAsignadas= this.registerForm.value.hora;
          this.actividadAsignada.estado = "Asignada";
          console.log(this.actividadAsignada);
          this.actividadAsignadaService.addActividad(this.actividadAsignada)
          .subscribe(
          );
          
          //.subscribe(rest => {          this.getActividadesDocente(this.docente.identificacion);
  
          alert("SE ASIGNO UN TIPO DE ACTIVIDAD");
          this.getAll();
        } else {
          //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
          alert("Debe buscar un docente");
           this.getAll();
        }
      } else {
       // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
        alert("Rellene los campos");
        this.getAll();
      }

    }else {
      alert("Las horas deben ser mayor a 1");
        this.getAll();
    }
    
   
  }
  //actividad por docente
  getActividadesDocente(id: number) {
    this.tipoActividadService
      .getActividadesDocente(id)
      .subscribe(tipoActividad => (this.tipoActividad = tipoActividad));
  }

  
}