import { Component, OnInit } from '@angular/core';
import { Acciones } from '../../../models/acciones';
import { AccionesService } from '../../services/acciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-acciones',
  templateUrl: './registro-acciones.component.html',
  styleUrls: ['./registro-acciones.component.css']
})
export class RegistroAccionesComponent implements OnInit {
  constructor(private accionesService: AccionesService, private formBuilder: FormBuilder) { }
  acciones: Acciones;
  registerForm: FormGroup;
  submitted = false;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre_Accion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      tipo_Accion: ['', Validators.required]
    });
  }

  add() {
    this.acciones = this.registerForm.value;
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.accionesService.addAcciones(this.acciones)
      .subscribe(
       // alert('Se agrego un nuevo acciones')
      );
      
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.add();
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}