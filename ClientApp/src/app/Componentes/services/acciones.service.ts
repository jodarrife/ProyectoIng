import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Acciones } from '../../models/acciones';
import { HandleErrorService } from '../../Componentes/Errores/@base/services/handle-error.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})


export class AccionesService {


  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleErrorService,
  ) {
    this.baseUrl = baseUrl;
  }


  /** POST: add a new Acciones to the server */
  addAcciones(acciones: Acciones): Observable<Acciones> {
    return this.http.post<Acciones>(this.baseUrl + 'api/Acciones', acciones, httpOptions).pipe(
      tap((newAcciones: Acciones) => this.handleErrorService.log(`added NewAcciones w/ Codigo=${newAcciones.cod_Accion}`)),
      catchError(this.handleErrorService.handleError<Acciones>('addAcciones'))
    );
  }

  /** GET Acciones from the server */
  getAll(): Observable<Acciones[]> {
    return this.http.get<Acciones[]>(this.baseUrl + 'api/Acciones').pipe(
      tap(),
      catchError(this.handleErrorService.handleError<Acciones[]>('Consulta aciiones', []))
    );
  }

  /** GET Acciones by cod_Accion. Will 404 if id not found */
  get(cod_Accion: number): Observable<Acciones> {
    const url = `${this.baseUrl + 'api/Acciones'}/${cod_Accion}`;
    return this.http.get<Acciones>(url).pipe(
      tap(_ => this.handleErrorService.log(`fetched Acciones cod_Accion=${cod_Accion}`)),
      catchError(this.handleErrorService.handleError<Acciones>(`getAcciones cod_Accion=${cod_Accion}`))
    );
  }

  /** PUT: update the Acciones on the server */
  update(acciones: Acciones): Observable<any> {
    const url = `${this.baseUrl + 'api/Acciones'}/${acciones.cod_Accion}`;
    return this.http.put(url, acciones, httpOptions).pipe(
      tap(_ => this.handleErrorService.log(`updated acciones cod_Accion=${acciones.cod_Accion}`)),
      catchError(this.handleErrorService.handleError<any>('updateDocentes'))
    );
  }

  /** DELETE: delete the Acciones from the server */
  delete(acciones: Acciones | number): Observable<Acciones> {
    const id = typeof acciones === 'number' ? acciones : acciones.cod_Accion;
    const url = `${this.baseUrl + 'api/Acciones'}/${id}`;
    return this.http.delete<Acciones>(url, httpOptions).pipe(
      tap(_ => this.handleErrorService.log(`deleted acciones cod_Accion=${id}`)),
      catchError(this.handleErrorService.handleError<Acciones>('deleteAcciones'))
    );
  }

}