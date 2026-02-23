import {Component, OnInit} from '@angular/core';
import {MdbModalRef} from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModal implements OnInit{
  constructor(public confirmModalRef: MdbModalRef<ConfirmModal>) {}

  ngOnInit(): void {
    // Fermeture automatique après 2 secondes
    setTimeout(() => {
      this.confirmModalRef.close();
    }, 2000);
  }

}
