import { Pipe, PipeTransform } from '@angular/core';
import { PlanAcciones } from 'src/app/models/plan-acciones';

@Pipe({
  name: 'filtroPlanAccion'
})
export class FiltroPlanAccionPipe implements PipeTransform {


  transform(planAcciones: PlanAcciones[], searchText: string) {
    if (searchText == null) return planAcciones;
    return planAcciones.filter(planAccion =>
      planAccion.accioness.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      ||
      planAccion.idPlanAcciones.toString().indexOf(searchText.toLowerCase()) !== -1

    );
  }
}