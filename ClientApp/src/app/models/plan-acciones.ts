import {ActividadAsignada} from "./actividad-asignada";
import {Acciones} from "./acciones";

export class PlanAcciones {
    idPlanAcciones:number;
    accioness:Acciones[];
    fecha:Date;
    actividad:ActividadAsignada;
}