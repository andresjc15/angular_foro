import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { Categoria } from './models/categoria';
import { CategoriaService } from './services/categoria.service';
import { AuthService } from './services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'foroapp';

  categorias: Categoria[];


  constructor(
    private router: Router,
    public authService: AuthService,
    private categoriaService: CategoriaService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {


      this.categoriaService.getCategorias().subscribe(
        response =>{
          this.categorias = response as Categoria[];
          this.categorias.forEach(categoria => console.log(categoria.nombre))
        },
        error =>{
          console.log(error);
        }
      );

  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout','Hola '+username+' has cerrado sesión con éxito','success');
    this.router.navigate(['']);
  }

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '560px',
      width: '600px',
    });
    

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
