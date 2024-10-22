import { Component ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from "../../service/api.service";

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  
})
export class OrdenesComponent {
  ordenForm!: FormGroup;
  usuarios: any[] = [];
  productos: any[] = [];
  categorias: any[] = [];
  productosFiltrados: any[] = [];
  usuariosFiltrados!: Observable<any[]>;
  ordenes: any[] = [];  // Lista de órdenes
  ordenesFiltradas: any[] = [];  // Lista filtrada de órdenes

  // Control para el campo de búsqueda
  searchControl = new FormControl('');

  // Variables para controlar mensajes de alerta
  successMessage: string = '';
  errorMessage: string = '';

  usuarioControl = new FormControl('', Validators.required);
  categoriaControl = new FormControl('', Validators.required);
  productoControl = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.ordenForm = this.fb.group({
      usuario: this.usuarioControl,
      categoria: this.categoriaControl,
      producto: this.productoControl,
      cantidad: [0, [Validators.required, Validators.min(1)]],
      precioUnitario: [0, [Validators.required, Validators.min(0.01)]],
    });

    this.apiService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
      this.usuariosFiltrados = this.usuarioControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterUsuarios(value || ''))
      );
    });

    this.apiService.getProductos().subscribe((data) => {
      this.productos = data;
      this.categorias = [...new Set(this.productos.map((prod) => prod.categoria))];
    });

    this.categoriaControl.valueChanges.subscribe((categoriaSeleccionada) => {
      this.productosFiltrados = this.productos.filter(producto => producto.categoria === categoriaSeleccionada);
      this.productoControl.setValue('');
    });

    // Obtener las órdenes iniciales
    this.obtenerOrdenes();
  }

  obtenerOrdenes() {
    this.apiService.getOrdenes().subscribe((data) => {
      this.ordenes = data;
      this.ordenesFiltradas = data; // Inicializar con todas las órdenes
    });
  }

  guardarOrden() {
    if (this.ordenForm.valid) {
      const usuarioSeleccionado = this.usuarios.find(u => u.idusuario === this.usuarioControl.value);
      const productoSeleccionado = this.productos.find(p => p.idproducto === this.productoControl.value);

      const nuevaOrden = {
        idorden: null,
        usuario: usuarioSeleccionado,
        producto: productoSeleccionado,
        cantidad: this.ordenForm.get('cantidad')?.value,
        preciounitario: this.ordenForm.get('precioUnitario')?.value,
        fecha: new Date().toISOString().split('T')[0],  // Formato de fecha YYYY-MM-DD
      };

      this.apiService.guardarOrden(nuevaOrden).subscribe(
        (response) => {
          // Mostrar mensaje de éxito
          this.successMessage = 'Orden guardada con éxito.';
          this.errorMessage = '';  // Limpiar cualquier mensaje de error

          // Actualizar la lista de órdenes
          this.obtenerOrdenes();

          // Reiniciar el formulario
          this.ordenForm.reset();

          // Ocultar el mensaje de éxito después de unos segundos
          setTimeout(() => this.successMessage = '', 3000);
        },
        (error) => {
          // Mostrar mensaje de error
          this.errorMessage = 'Error al guardar la orden. Inténtelo de nuevo más tarde.';
          this.successMessage = '';  // Limpiar cualquier mensaje de éxito

          // Ocultar el mensaje de error después de unos segundos
          setTimeout(() => this.errorMessage = '', 3000);
        }
      );
    }
  }

  // Método para filtrar usuarios
  private _filterUsuarios(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(filterValue) ||
      usuario.paterno.toLowerCase().includes(filterValue) ||
      usuario.materno.toLowerCase().includes(filterValue) ||
      usuario.correo.toLowerCase().includes(filterValue)
    );
  }
}