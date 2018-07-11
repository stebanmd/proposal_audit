import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  corpo: string = 'Confirma a ação?';
  titulo: string = 'Confirmação';
  showCancelButton: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != undefined) {
      if (data.hasOwnProperty('msg')) this.corpo = data.msg;
      if (data.hasOwnProperty('title')) this.titulo = data.title;
      if (data.hasOwnProperty('showCancel')) this.showCancelButton = data.showCancel;
    }
  }

}
