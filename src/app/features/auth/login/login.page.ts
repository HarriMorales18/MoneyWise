import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  ionViewWillEnter() {
    this.submitted = false;
    this.errorMessage = '';
    this.loginForm.markAsPristine();
    this.loginForm.markAsUntouched();
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

  async onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    const success = this.authService.login(email, password);

    if (await success) {
      this.router.navigate(['/tabs/dashboard']);
    } else {
      this.errorMessage = 'Email o contraseña inválidos';
    }
  }

}