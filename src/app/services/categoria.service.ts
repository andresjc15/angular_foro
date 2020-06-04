import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Categoria } from '../models/categoria';
import { BASE_ENDPOINT } from './global';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class CategoriaService {

    protected baseEndpoint = BASE_ENDPOINT + 'categorias';

    constructor( private http: HttpClient, private router: Router) {

    }


    getCategorias(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(this.baseEndpoint );
    }
}