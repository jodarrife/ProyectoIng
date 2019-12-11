import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TipoActividad} from 'src/app/models/tipo-actividad';
import { TipoActividadService} from '../../services/tipo-actividad.service';

@Component({
  selector: 'app-modificar-tipo-actividad',
  templateUrl: './modificar-tipo-actividad.component.html',
  styleUrls: ['./modificar-tipo-actividad.component.css']
})
export class ModificarTipoActividadComponent implements OnInit {
 tipoActividad: TipoActividad;

  constructor(private route: ActivatedRoute,
    private tipoActividadService: TipoActividadService,
    private location: Location) { }

  ngOnInit() {
    this.get();
  }

  get(): void {
    const cod_TipoActividad =
      +this.route.snapshot.paramMap.get('cod_TipoActividad');
    this.tipoActividadService.get(cod_TipoActividad)
      .subscribe(tipoactividad => this.tipoActividad = tipoactividad);
  }
  update(): void {
    this.tipoActividadService.update(this.tipoActividad)
      .subscribe(() => this.goBack());
  }
  delete(): void {
    this.tipoActividadService.delete(this.tipoActividad)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }

}