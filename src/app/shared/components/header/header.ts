import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Storage} from '../../../core/services/storage';
import {Auth} from '../../../core/services/auth';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  userStored: any = null;
  storageService = inject(Storage);
  router = inject(Router);
  authService = inject(Auth);

  ngOnInit() {
    this.userStored = this.storageService.getUser();
  }

  get initials(): string {
    if (!this.userStored) return '?';
    return `${this.userStored.firstname?.charAt(0)}${this.userStored.lastname?.charAt(0)}`.toUpperCase();
  }

  logout(): void {
    this.authService.logout();
  }
}
