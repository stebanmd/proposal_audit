import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../models/categoria';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit  {
  
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  categorias: Categoria[];
  isLoading = true;
  
  constructor(private service: CategoriaService, private dialog: MatDialog) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: './assets/localization/dataTables.language.json'
      }      
    };

    this.service.listar().subscribe(response => {
      this.categorias = <Categoria[]>response;
      this.dtTrigger.next();
      this.isLoading = false;
    });        
  }  

  remover(categoria) {
    this.dialog.open(ModalComponent, { data: { msg: 'Confirma a remoção do registro?' }})
      .afterClosed().subscribe(ok => {
        if (ok) {
          this.isLoading = true;
          this.service.remover(categoria.ID).subscribe(res => {
            let index = this.categorias.indexOf(categoria);
            this.categorias.splice(index, 1);
      
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
              this.isLoading = false;
            });
          }, err => {
            this.dialog.open(ModalComponent, { data: { title:"Erro!", msg: err.error.Mensagem, showCancel: false }})
            this.isLoading = true;
          })
        }
      })
  }
}
