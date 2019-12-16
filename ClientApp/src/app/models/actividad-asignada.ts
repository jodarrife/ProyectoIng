import { Docente } from "./docente";
export class ActividadAsignada {
    idActividad: number;
    nombreActividad: string;
    docente: Docente;
    horasAsignadas:number;
    estado:string;
}
