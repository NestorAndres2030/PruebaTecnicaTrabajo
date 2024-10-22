import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  usuarios: any[] = [];  // Lista de usuarios
  searchText: string = '';  // Texto de búsqueda
  usuarioSeleccionado: any = null; // Usuario que se va a editar o agregar
  isEditing: boolean = false; // Variable para determinar si estamos editando o agregando

  // Variables para la alerta
  alertaVisible: boolean = false;
  mensajeAlerta: string = '';

  @ViewChild('userEditModal') userEditModal!: TemplateRef<any>;  // Referencia al template del modal

  constructor(private apiService: ApiService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.apiService.getUsuarios().subscribe((data: any) => {
      this.usuarios = data;
    });
  }

  // Filtrar usuarios basados en el texto de búsqueda
  usuariosFiltrados() {
    if (!this.searchText) {
      return this.usuarios;
    }
    const search = this.searchText.toLowerCase();
    return this.usuarios.filter(usuario =>
      Object.values(usuario).some(val => String(val).toLowerCase().includes(search))
    );
  }

  // Abrir el modal de edición
  abrirModal(usuario: any) {
    this.isEditing = true;  // Indicamos que estamos en modo edición
    this.usuarioSeleccionado = { ...usuario };  // Clonar el usuario seleccionado para evitar cambios directos
    this.modalService.open(this.userEditModal, { size: 'lg' });
  }

  // Abrir el modal para agregar un nuevo usuario
  abrirModalNuevo() {
    this.isEditing = false;  // Indicamos que estamos en modo agregar
    this.usuarioSeleccionado = null;  // No hay usuario seleccionado, por lo tanto, será un formulario vacío
    this.modalService.open(this.userEditModal, { size: 'lg' });
  }

  onSubmitForm(usuario: any) {
    console.log('Datos enviados al servidor:', usuario);  // Asegúrate de que el correo no esté vacío
  
    if (this.isEditing) {
      this.apiService.editarUsuario(this.usuarioSeleccionado.idusuario, usuario).subscribe(
        (response) => {
          this.modalService.dismissAll();
          this.mostrarAlerta('Usuario actualizado exitosamente');
          this.actualizarListaUsuarios();
        },
        (error) => {
          this.modalService.dismissAll();
          this.mostrarAlerta('Error al actualizar usuario');
          console.error('Error al actualizar usuario:', error);
        }
      );
    } else {
      this.apiService.agregarUsuario(usuario).subscribe(
        (response) => {
          this.modalService.dismissAll();
          this.mostrarAlerta('Usuario agregado exitosamente');
          this.actualizarListaUsuarios();
        },
        (error) => {
          this.modalService.dismissAll();
          this.mostrarAlerta('Error al agregar usuario');
          console.error('Error al agregar usuario:', error);
        }
      );
    }
  }
  

  mostrarAlerta(mensaje: string) {
    this.mensajeAlerta = mensaje;
    this.alertaVisible = true;
  
    // Ocultar la alerta automáticamente después de 3 segundos
    setTimeout(() => {
      this.alertaVisible = false;
    }, 3000);
  }
  

  // Función para cerrar la alerta manualmente
  cerrarAlerta() {
    this.alertaVisible = false;
  }

  // Función para volver a cargar la lista de usuarios después de agregar/editar
  actualizarListaUsuarios() {
    this.apiService.getUsuarios().subscribe((data: any) => {
      this.usuarios = data;
    });
  }
}