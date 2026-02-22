import {Component, inject, OnInit} from '@angular/core';
import {Auth} from '../../services/auth';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout implements OnInit {

  authService = inject(Auth);

  ngOnInit() {
    localStorage.removeItem("auth_token");
    localStorage.clear();
    this.authService.logout();
  }
}
