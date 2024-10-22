import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {
  @Input() user: any = null;  // Recibe el usuario a editar o null si es un nuevo usuario
  @Output() submitForm = new EventEmitter<any>();  // Emitir evento al enviar el formulario
  @Output() cancel = new EventEmitter<void>();  // Emitir evento al cancelar

  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicializar el formulario con los valores del usuario si existen, o vacíos si es un nuevo usuario
    this.userForm = this.fb.group({
      nombre: [this.user?.nombre || '', Validators.required],
      paterno: [this.user?.paterno || '', Validators.required],
      materno: [this.user?.materno || '', Validators.required],
      correo: [this.user?.correo || '', [Validators.required, Validators.email]],
      fecharegistro: [{ value: this.user?.fechaRegistro || new Date(), disabled: true }],
      estatus: [this.user?.estatus !== undefined ? this.user.estatus : 1, Validators.required],  
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.userForm.get(field);
    return !!(control?.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.getRawValue();
      this.submitForm.emit(formValue);  // Emitir el formulario al componente padre
    } else {
      this.userForm.markAllAsTouched();  // Marcar todos los campos como tocados si hay errores
    }
  }

  onCancel() {
    this.cancel.emit();  // Emitir evento de cancelación
  }
}