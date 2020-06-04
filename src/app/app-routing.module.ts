import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreatePublicacionComponent } from './components/publicacion/create-publicacion/create-publicacion.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'crear-publicacion', component: CreatePublicacionComponent },
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
