import { Component } from '@angular/core';
import {MdbModalRef} from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModal {
  constructor(public confirmModalRef: MdbModalRef<ConfirmModal>) {}
}
