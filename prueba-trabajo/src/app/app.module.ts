import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './modulo/usuario/usuario.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdenesComponent } from './modulo/ordenes/ordenes.component';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './modulo/user-list/user-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';  // Importa MatFormFieldModule
import { MatSelectModule } from '@angular/material/select';         // Importa MatSelectModule
import { MatInputModule } from '@angular/material/input';           // Importa MatInputModule
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    OrdenesComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,          // Importa MatSelectModule aquí
    MatInputModule,           // Importa MatInputModule para los inputs
    MatAutocompleteModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
