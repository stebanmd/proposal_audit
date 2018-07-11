import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Usuario } from '../../../models/usuario';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  usuarios: Usuario[];
  isLoading = true;
  canChangePass = false;

  constructor(private service: UsuarioService, private dialog: MatDialog) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: './assets/localization/dataTables.language.json'
      },
    };

    var currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    this.canChangePass = currentUser.Perfil === 'Administrador';

    this.service.listar().subscribe(response => {
      this.usuarios = <Usuario[]>response;
      this.dtTrigger.next();
      this.isLoading = false;
    });
  }

  remover(usuario) {
    if (usuario.Perfil == 0) {
      this.dialog.open(ModalComponent, {
        data: {
          title: 'Aviso!',
          msg: 'Não é posível excluir usuários com perfil de Administrador!',
          showCancel: false
        }
      });
      return;
    }

    this.dialog.open(ModalComponent, { data: { msg: 'Confirma a remoção do registro?' } })
      .afterClosed().subscribe(ok => {
        if (ok) {
          this.isLoading = true;
          this.service.remover(usuario.ID).subscribe(res => {
            let index = this.usuarios.indexOf(usuario);
            this.usuarios.splice(index, 1);

            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
              this.isLoading = false;
            });
          }, err => {
            this.dialog.open(ModalComponent, { data: { title: 'Erro!', msg: err.error.Mensagem, showCancel: false } })
            this.isLoading = true;
          })
        }
      });
  }

}
