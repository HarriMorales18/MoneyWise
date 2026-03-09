import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', [Validators.required]]
    }, { validators: this.passwordsIguales });
  }

  get f() {
    return this.registerForm.controls;
  }

  passwordsIguales(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmarPassword')?.value;
    return pass === confirm ? null : { noIguales: true };
  }

  getNombreError(): string {
    const control = this.f['nombre'];
    if (!control || !(control.touched || this.submitted)) {
      return '';
    }

    if (control.hasError('required')) {
      return 'El nombre es obligatorio';
    }

    return '';
  }

  getEmailError(): string {
    const control = this.f['email'];
    if (!control || !(control.touched || this.submitted)) {
      return '';
    }

    if (control.hasError('required')) {
      return 'El email es obligatorio';
    }

    if (control.hasError('email')) {
      return 'El formato del email no es valido';
    }

    return '';
  }

  getPasswordError(): string {
    const control = this.f['password'];
    if (!control || !(control.touched || this.submitted)) {
      return '';
    }

    if (control.hasError('required')) {
      return 'La contrasena es obligatoria';
    }

    if (control.hasError('minlength')) {
      return 'La contrasena debe tener minimo 6 caracteres';
    }

    return '';
  }

  getConfirmarPasswordError(): string {
    const control = this.f['confirmarPassword'];
    if (!control || !(control.touched || this.submitted)) {
      return '';
    }

    if (control.hasError('required')) {
      return 'Debes confirmar la contrasena';
    }

    if (
      this.registerForm.hasError('noIguales') &&
      !this.f['password'].hasError('required') &&
      !control.hasError('required')
    ) {
      return 'Las contrasenas no coinciden';
    }

    return '';
  }

  async registrar() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { nombre, email, password } = this.registerForm.value;
    const exito = this.authService.register(email, password, nombre);

    if (await exito) {
      this.router.navigate(['/tabs/dashboard'], { replaceUrl: true });
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'El correo ya está registrado.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}