import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Perfil } from '../models/perfil';
import { Usuario } from '../models/usuario';
import { BASE_ENDPOINT } from './global';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class LoginService {

    protected baseEndpoint = BASE_ENDPOINT ;

    constructor( private http: HttpClient, private router: Router) {

    }


    register(usuario: Usuario): Observable<Usuario> {
        return this.http.post(this.baseEndpoint+'register', usuario)
          .pipe(
            map((response: any) => response.usuario as Usuario),
            catchError(e => {
              if (e.status == 400) {
                return throwError(e);
              }
              if (e.error.mensaje) {
                console.error(e.error.mensaje);
              }
              return throwError(e);
            }));
      }
}