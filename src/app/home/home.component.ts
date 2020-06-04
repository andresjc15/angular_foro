import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../models/publicacion';
import { PublicacionService } from '../services/publicacion.service';
import { Perfil } from '../models/perfil';
import { Carrera } from '../models/carrera';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  publicaciones: Publicacion[];

  constructor(
    private publicacionService: PublicacionService,
  ) { }

  ngOnInit(){


    this.publicacionService.getPublicacion().subscribe(
        response =>{
          this.publicaciones = response as Publicacion[];
          this.publicaciones.forEach(publicacion => {
            if(!publicacion.perfil.carrera){
              publicacion.perfil.carrera = new Carrera();
              publicacion.perfil.carrera.nombre = 'Estudiante';
            }
          });
        },
        error =>{
          console.log(error);
        }
      );

 
  }
      
}
