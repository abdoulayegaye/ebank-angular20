import {inject, Injectable, signal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {Storage} from './storage';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: any;
  roles: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private readonly baseUrl = environment.apiUrl;
  private readonly uri = '/api/v1';
  private readonly TOKEN_KEY = 'auth_token';
  private http = inject(HttpClient);
  private router = inject(Router);
  private storage = inject(Storage);

  isAuthenticated = signal<boolean>(this.hasToken());

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}${this.uri}/authenticate`, credentials).pipe(
      tap(response => {
        this.storage.setToken(response.token);
        this.storage.setUser(response.user);
        this.isAuthenticated.set(true);
        console.log(this.storage.getUser())
      })
    );
  }

  logout(): void {
    this.storage.clear();
    this.isAuthenticated.set(false);
    this.router.navigate(['/auth/login']);
  }

  isLogin(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
