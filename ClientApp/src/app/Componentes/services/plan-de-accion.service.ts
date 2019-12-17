
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PlanAccion } from '../../models/plan-de-accion';
import { HandleErrorService } from '../../Componentes/Errores/@base/services/handle-error.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class PlanDeAccionService {

  public username;
  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleErrorService,
  ) {
    this.baseUrl = baseUrl;
  }
  /** POST: add a new docente to the server */
  addPlanAccion(planAccion: PlanAccion): Observable<PlanAccion> {
    return this.http.post<PlanAccion>(this.baseUrl + 'api/PlanAccion', planAccion, httpOptions).pipe(
      tap((newDocente: PlanAccion) => this.handleErrorService.log(`added NewDocente w/ Identificacion=${newDocente.idPlanAcciones}`)),
      catchError(this.handleErrorService.handleError<PlanAccion>('addPlanAccion'))
    );
  }

  /** GET Docente from the server */
  getAll(): Observable<PlanAccion[]> {
    return this.http.get<PlanAccion[]>(this.baseUrl + 'api/PlanAccion').pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<PlanAccion[]>('Consulta PlanAccion', null))
    );

  }

  /** GET Docente by Identificacion. Will 404 if id not found */
  get(idPlanAcciones: number): Observable<PlanAccion> {
    const url = `${this.baseUrl + 'api/PlanAccion'}/${idPlanAcciones}`;
    return this.http.get<PlanAccion>(url)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<PlanAccion>('Consulta de PlanAccion', null))
      );
  }
 
  /** PUT: update the docentes on the server */
  update(planAccion: PlanAccion): Observable<any> {
    const url = `${this.baseUrl + 'api/PlanAccion'}/${planAccion.idPlanAcciones}`;
    return this.http.put(url, planAccion, httpOptions).pipe(
      tap(_ => this.handleErrorService.log(`updated PlanAccion identificacion=${planAccion.idPlanAcciones}`)),
      catchError(this.handleErrorService.handleError<any>('updateDocentes'))
    );
  }

  /** DELETE: delete the docentes from the server */
  delete(planAccion: PlanAccion | number): Observable<PlanAccion> {
    const id = typeof planAccion === 'number' ? planAccion : planAccion.idPlanAcciones;
    const url = `${this.baseUrl + 'api/PlanAccion'}/${id}`;
    return this.http.delete<PlanAccion>(url, httpOptions).pipe(
      tap(_ => this.handleErrorService.log(`deleted PlanAccion identificacion=${id}`)),
      catchError(this.handleErrorService.handleError<PlanAccion>('deleteDocente'))
    );
  }

  //obtener planes de docente
  getPlanesByDocente(identificacion: number): Observable<PlanAccion[]> {
    const url = `${this.baseUrl + "api/PlanAccion"}/docente=${identificacion}`;
    return this.http.get<PlanAccion[]>(url).pipe(
      tap(_ => this.handleErrorService.log("Se Consulta la información")),
      catchError(this.handleErrorService.handleError<PlanAccion[]>("getAll", []))
    );
  }

}
