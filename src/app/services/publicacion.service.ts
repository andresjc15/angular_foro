import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Publicacion } from '../models/publicacion';
import { BASE_ENDPOINT } from './global';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })
export class PublicacionService {

    protected baseEndpoint = BASE_ENDPOINT ;

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor( 
      private http: HttpClient, 
      private router: Router,
      private authService: AuthService
      ) {}

      private addAuthorizationHeader(){
        let token = this.authService.token;
        if(token !=null) {
          return this.httpHeaders.append('Authorization', 'Bearer' + token);
        }
        return this.httpHeaders;
      }

    private isNoAutorizado(e): boolean{
      if(e.status==401 || e.status==403){
        this.router.navigate(['login'])
        return true;
      } 
      return false;
    }


    getPublicacion(): Observable<Publicacion[]> {
        return this.http.get<Publicacion[]>(this.baseEndpoint + 'publicaciones' );
    }

    createPublicacion(publicacion: Publicacion, id: number ): Observable<Publicacion> {
        return this.http.post(this.baseEndpoint+'perfiles/'+id+'/publicaciones', publicacion)
          .pipe(
            map((response: any) => response.publicacion as Publicacion),
            catchError(e => {
              this.isNoAutorizado(e);
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