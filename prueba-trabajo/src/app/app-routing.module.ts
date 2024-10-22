import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './modulo/user-list/user-list.component';
import { OrdenesComponent } from './modulo/ordenes/ordenes.component';

const routes: Routes = [
  { path: 'usuarios', component: UserListComponent },  // Ruta para la lista de usuarios
  { path: 'ordeenes', component: OrdenesComponent },  // Ruta para la vista de reportes
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' }, // Redireccionar a la página de usuario
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
