import { Pipe, PipeTransform } from '@angular/core';
import { PlanAccion } from 'src/app/models/plan-de-accion';

@Pipe({
  name: 'filtroPlanAccion'
})
export class FiltroPlanAccionPipe implements PipeTransform {


  transform(planAcciones: PlanAccion[], searchText: string) {
    if (searchText == null) return planAcciones;
    return planAcciones.filter(planAccion =>
      planAccion.acciones.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      ||
      planAccion.idPlanAcciones.toString().indexOf(searchText.toLowerCase()) !== -1

    );
  }
}