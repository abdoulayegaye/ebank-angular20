import { Component } from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";

@Component({
  selector: 'app-error-modal',
  imports: [],
  templateUrl: './error-modal.html',
  styleUrl: './error-modal.css',
})
export class ErrorModal {
  constructor(public errormModalRef: MdbModalRef<ErrorModal>) {}
}
