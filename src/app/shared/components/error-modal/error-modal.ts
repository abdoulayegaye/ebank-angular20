import {Component, OnInit} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";

@Component({
  selector: 'app-error-modal',
  imports: [],
  templateUrl: './error-modal.html',
  styleUrl: './error-modal.css',
})
export class ErrorModal implements OnInit {

  message: string = 'Une erreur est survenue. Veuillez réessayer.';

  constructor(public errorModalRef: MdbModalRef<ErrorModal>) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.errorModalRef.close();
    }, 5000);
  }
}
