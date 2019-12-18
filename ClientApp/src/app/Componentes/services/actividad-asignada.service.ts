import { Injectable, Inject } from '@angular/core';
import { ActividadAsignada } from 'src/app/models/actividad-asignada';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HandleErrorService } from '../../Componentes/Errores/@base/services/handle-error.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ActividadAsignadaService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private handleErrorService: HandleErrorService) { }

  addActividad(actividad: ActividadAsignada): Observable<ActividadAsignada> {
    return this.http.post<ActividadAsignada>(this.baseUrl + 'api/ActividadAsignada', actividad, httpOptions).pipe(
      tap()
    );
  }

  getAll(): Observable<ActividadAsignada[]> {
    return this.http.get<ActividadAsignada[]>(this.baseUrl + 'api/ActividadAsignada').pipe(
      tap(_ => console.log('Se Consulta la información')),
      catchError(this.handleError<ActividadAsignada[]>('getAll', []))
    );
  }
  get(id: number): Observable<ActividadAsignada> {
    const url = `${this.baseUrl + 'api/ActividadAsignada'}/${id}`;
    return this.http.get<ActividadAsignada>(url).pipe(
      tap(_ => console.log(`Actividad consultada id=${id}`)),
      catchError(this.handleError<ActividadAsignada>(`getActividad id=${id}`))
    );
  }
  getActividadesDocente(identificacion: number): Observable<ActividadAsignada[]> {
    const url = `${this.baseUrl + 'api/ActividadAsignada'}/Docente=${identificacion}`;
    return this.http.get<ActividadAsignada[]>(url).pipe(
      tap(_ => console.log('Se Consulta la información')),
      catchError(this.handleError<ActividadAsignada[]>('getAll', []))
    );
  }
  update(actividad: ActividadAsignada): Observable<any> {
    const url = `${this.baseUrl + 'api/ActividadAsignada'}/${actividad.idActividad}`;
    return this.http.put(url, actividad, httpOptions).pipe(
      tap(_ => console.log(`Actividad actualizada id=${actividad.idActividad}`)),
      catchError(this.handleError<any>('ActividadUpdate'))
    );
  }
  delete(actividad: ActividadAsignada | number): Observable<ActividadAsignada> {
    const id = typeof actividad === 'number' ? actividad : actividad.idActividad;
    const url = `${this.baseUrl + 'api/ActividadAsignada'}/${id}`;

    return this.http.delete<ActividadAsignada>(url, httpOptions).pipe(
      tap(_ => this.log(`Actividad eliminada id=${id}`)),
      catchError(this.handleError<ActividadAsignada>('deleteActividad'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    alert(`SERVIDOR: ${message}`);
  }



  
}