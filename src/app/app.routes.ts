import { Routes } from '@angular/router';
import {Logout} from './core/auth/logout/logout';
import {authGuard} from './core/guards/auth-guard';
import {Home} from './features/home/home';
import {Customers} from './features/customers/customers';
import {Login} from './core/auth/login/login';
import {FormCustomers} from './features/customers/form-customers/form-customers';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: Login,
  },
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard],
  },
  {
    path: 'add-customer',
    component: FormCustomers,
    canActivate: [authGuard],
  },
  {
    path: 'customers',
    component: Customers,
    canActivate: [authGuard],
  },
  {
    path: 'logout',
    component: Logout,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/home',
  }
];
