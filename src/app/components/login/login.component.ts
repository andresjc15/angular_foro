import { Component, OnInit } from '@angular/core';
import { Perfil } from '../../models/perfil';
import { Usuario } from '../../models/usuario';
import { LoginService } from '../../services/login.service';
import { Carrera } from 'src/app/models/carrera';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuariol : Usuario;
  public perfil: Perfil ;

  errores: string[];

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.usuariol = new Usuario();
  }

  ngOnInit(){
    this.usuariol = new Usuario();
    this.usuariol.perfil = new Perfil()
    if(this.authService.isAuthenticated()){
      swal.fire('Login','Hola '+this.authService.usuario.username+' ya estas autenticado!','info');
      this.router.navigate(['']);
    }
  }

  create(): void {
    console.log(this.usuariol);
    this.loginService.register(this.usuariol)
      .subscribe(
        usuario => {
          location.reload();
          swal.fire('Registro', 'Hola '+usuario.perfil.nombre+', te haz registrado exitosamente', 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  login(): void {
    console.log(this.usuariol);
    if(this.usuariol.username == null || this.usuariol.password == null){
      swal.fire('Error Login','username o password vacias','error');
      return;
    }

    this.authService.login(this.usuariol).subscribe(response => {
      console.log(response);

      this.authService.saveUsuario(response.access_token);
      this.authService.saveToken(response.access_token);
      location.reload();

      let usuario = this.authService.usuario;

      //this.router.navigate(['']);
      swal.fire('Login', 'Hola '+usuario.username+', has inciado sesion exitosamente', 'success')
    }, err => {
      if(err.status == 400){
        swal.fire('Error Login', 'Usuario o clave incorrecta', 'error')
      }
    }
    );
  }

}
