import {Component, inject, OnInit} from '@angular/core';
import {Header} from '../../shared/components/header/header';
import {Storage} from '../../core/services/storage';

@Component({
  selector: 'app-home',
  imports: [
    Header
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  storageService = inject(Storage);

  ngOnInit() {
    const authToken = this.storageService.getToken();
    if (authToken) {
      console.log(`Token : ${authToken}`);
    }
  }
}
