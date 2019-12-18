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
  addAcciones(accion: Acciones) {
    let accioness: Acciones[] = [];
    if (sessionStorage.getItem("accioness") != null) {
      accioness = JSON.parse(sessionStorage.getItem("accioness"));
    }
    accioness.push(accion);
    sessionStorage.setItem("accioness", JSON.stringify(accioness));
    alert("Accion Agregada");
  }
  getAcciones(): Acciones[] {
    if (sessionStorage.getItem("accioness") != null) {
      return JSON.parse(sessionStorage.getItem("accioness"));
    } else {
      return [];
    }
  }
  getAccion(id: number): Observable<Acciones> {
    const url = `${this.baseUrl + 'api/accion'}/${id}`;
    return this.http.get<Acciones>(url).pipe(
      tap(_ => console.log(`Accion consultada id=${id}`)),
      catchError(this.handleError<Acciones>(`getAccion id=${id}`))
    );
  }
  update(accion: Acciones): Observable<any> {
    const url = `${this.baseUrl + 'api/accion'}/${accion.idAccion}`;
    return this.http.put(url, accion, httpOptions).pipe(
      tap(_ => this.log(`Accion Guardada`)),
      catchError(this.handleError<any>('AccionUpdate'))
    );
  }
  deleteAccion(accion: Acciones) {
    let accioness: Acciones[] = JSON.parse(sessionStorage.getItem("accioness"));
    var i, j;
    i = 0;

    accioness.forEach(element => {
      if (JSON.stringify(element) == JSON.stringify(accion)) {
        +accioness.splice(i, 1);
      } else {
        i++;
      }
    });
    sessionStorage.setItem("accioness", JSON.stringify(accioness));
  }
  eliminarAcciones() {
    sessionStorage.removeItem('accioness');
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