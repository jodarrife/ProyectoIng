import { Docente } from "./docente";
export class ActividadAsignada {
    idActividad: number;
    nombreActividad: string;
    docenteItemId: number;
    docente: Docente;
    horasAsignadas:number;
    estado:string;
}