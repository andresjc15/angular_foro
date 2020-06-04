import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/models/publicacion';

import { Router, ActivatedRoute } from '@angular/router';
import { PublicacionService } from 'src/app/services/publicacion.service';

import swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-publicacion',
  templateUrl: './create-publicacion.component.html',
  styleUrls: ['./create-publicacion.component.css']
})
export class CreatePublicacionComponent implements OnInit {
  
  public publicacion: Publicacion;
  public id: String;

  errores: string[];

  constructor(
    private authService: AuthService,
    private publicacionService: PublicacionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.publicacion = new Publicacion();
    this.id = '7'
  }

  ngOnInit(): void {

    if(this.authService.isAuthenticated() == false){
      swal.fire('Iniciar sesion','Inicia sesion para crear una publicacion','info');
      this.router.navigate(['/login']);
    }
  }

  create(): void {
    console.log(this.publicacionService);

    /*swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.publicacionService.createPublicacion(this.publicacion, this.authService.usuario.id)
      .subscribe(
        publicacion => {
          swal.fire('Nueva publicacion', 'Publicacion: '+this.publicacion.titulo+' ha sido creado con éxito', 'success');
          this.router.navigate(['']);
          
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
      }
    })*/

    this.publicacionService.createPublicacion(this.publicacion, this.authService.usuario.id)
      .subscribe(
        publicacion => {
          swal.fire('Nueva publicacion', 'Publicacion: '+this.publicacion.titulo+' ha sido creado con éxito', 'success');
          this.router.navigate(['']);
          
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
    
  }

}
