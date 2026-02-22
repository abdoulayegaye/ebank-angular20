import {Component, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Auth, LoginRequest} from '../../services/auth';
import {HttpError} from '../../../shared/services/http-error';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  router = inject(Router);
  authService = inject(Auth);
  httpError = inject(HttpError)
  username= signal<string>('');
  password= signal<string>('');
  loading= signal<boolean>(false);
  error= signal<string>('');

  login() {
    if (!this.username() || !this.password()) {
      this.error.set('Veuillez remplir tous les champs.');
      return;
    }

    const credentials: LoginRequest = {
      username: this.username(),
      password: this.password()
    };

    this.loading.set(true);
    this.error.set('');

    this.authService.login(credentials).subscribe({
      next: (data) => {
        this.loading.set(false);
        this.router.navigate(['/home']);
        console.log('Login successful')
      },
      error: (err) => this.httpError.handleError(err)
    });
  }
}
