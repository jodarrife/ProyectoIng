import { Pipe, PipeTransform } from '@angular/core';
import { ActividadAsignada } from 'src/app/models/actividad-asignada';

@Pipe({
  name: 'filtroActAsignada'
})
export class FiltroActAsignadaPipe implements PipeTransform {

  transform(activiti: ActividadAsignada[], searchText: string) {
    if (searchText == null) return activiti;
    return activiti.filter(activity =>
      activity.docenteItemId.toString().indexOf(searchText.toLowerCase()) !== -1
        ||
        activity.nombreActividad.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
     
    );
}
}
