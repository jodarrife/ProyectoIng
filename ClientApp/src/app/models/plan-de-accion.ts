import { Acciones } from "./acciones";
import { ActividadAsignada } from "./actividad-asignada";

export class PlanAccion {
    idPlanAcciones:number;
    acciones:Acciones[];
    fecha:Date;
    actividad:ActividadAsignada;
}