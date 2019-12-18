import { Component, OnInit} from '@angular/core';
import { TipoActividad } from 'src/app/models/tipo-actividad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoActividadService } from 'src/app/Componentes/services/tipo-actividad.service';

@Component({
  selector: 'app-registro-tipo-de-actividad',
  templateUrl: './registro-tipo-de-actividad.component.html',
  styleUrls: ['./registro-tipo-de-actividad.component.css']
})
export class RegistroTipoDeActividadComponent implements OnInit {
  tipoActividad: TipoActividad;
  registerForm: FormGroup;
  submitted = false;

  constructor(private tipoActividadService: TipoActividadService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre_Actividad: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]]

    });
  }
  add() {
    this.tipoActividad = this.registerForm.value;
    this.tipoActividadService.addTipoActividad(this.tipoActividad)
      .subscribe(
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