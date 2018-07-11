import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Fornecedor } from '../../../models/fornecedor';
import { FornecedorService } from '../../../services/fornecedor.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  fornecedores: Fornecedor[];
  isLoading = true;

  constructor(private service: FornecedorService, private dialog: MatDialog) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: './assets/localization/dataTables.language.json'
      },
    };

    this.service.listar().subscribe(response => {
      this.fornecedores = <Fornecedor[]>response;
      this.dtTrigger.next();
      this.isLoading = false;
    });
  }

  remover(fornecedor) {
    this.dialog.open(ModalComponent, {data: {msg: 'Confirma a remoção do registro?'}})
      .afterClosed().subscribe(ok => {
        if (ok) {
          this.isLoading = true;
          this.service.remover(fornecedor.ID).subscribe(res => {
            let index = this.fornecedores.indexOf(fornecedor);
            this.fornecedores.splice(index, 1);
    
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
              this.isLoading = false;
            });
          }, err => {
            this.dialog.open(ModalComponent, { data: { title: 'Erro!', msg: err.error.Mensagem, showCancel: false }})
            this.isLoading = true;
          })
        }
      })
  }
}
