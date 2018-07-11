import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Proposta } from '../../../models/proposta';
import { PropostaService } from '../../../services/proposta.service';
import { FiltroProposta } from '../../../models/filtroProposta';
import { Utils } from '../../../helpers/utils';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-proposta',
  templateUrl: './proposta.component.html',
  styleUrls: ['./proposta.component.css']
})
export class PropostaComponent implements OnInit {
  constructor(private service: PropostaService, private dialog: MatDialog) { }

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  propostas: Proposta[];
  isLoading = true;
  currentUsuario: any;

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: './assets/localization/dataTables.language.json'
      },
    };

    this.currentUsuario = JSON.parse(localStorage.getItem('CurrentUser'));
    this.isLoading = false;
  }

  private refreshTable() {
    if (this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
  }

  listarPorFiltro($event) {
    this.propostas = [];
    let filtro = new FiltroProposta();
    filtro.NomeProposta = $event.NomeProposta;
    filtro.NomeFornecedor = $event.NomeFornecedor;
    filtro.Status = parseInt($event.Status);
    filtro.IdCategoria = parseInt($event.IdCategoria);
    filtro.DataInicial = Utils.toSystemDate($event.DataInicial);
    filtro.DataFinal = Utils.toSystemDate($event.DataFinal);

    this.isLoading = true;
    this.service.pesquisar(filtro).subscribe((res: Proposta[]) => {
      this.propostas = res;
      this.refreshTable();

      if (this.propostas.length == 0) {
        this.dialog.open(ModalComponent, {data: {
          msg: 'Sua pesquisa não retornou nenhum registro!', showCancel: false, title: 'Aviso!'
        }});
      }
      this.isLoading = false;
    }, (err) => {
      console.error(err);
      this.isLoading = false;
    })
  }

  remover(entity: Proposta) {
    if (entity.Status === 0 || entity.Status === 2) {
      this.dialog.open(ModalComponent, { data: { msg: 'Confirma a remoção do registro?' } })
        .afterClosed().subscribe(ok => {
          if (ok) {
            this.isLoading = true;
            this.service.remover(entity.ID).subscribe(res => {
              let index = this.propostas.indexOf(entity);
              this.propostas.splice(index, 1);
              this.refreshTable();
              this.isLoading = false;
            }, err => {
              this.dialog.open(ModalComponent, { data: { title: 'Erro!', msg: err.Mensagem, showCancel: false } })
              this.isLoading = false;
            })
          }
        });

    } else {
      this.dialog.open(ModalComponent, {
        data: {
          title: 'Aviso',
          msg: 'Não é possível excluir essa proposta pois ela encontra-se ' + entity.StatusStr,
          showCancel: false
        }
      });
    }
  }

  aprovar(entity: Proposta) {
    if (this.currentUsuario.Perfil === 'AnalistaComercial') {
      this.dialog.open(ModalComponent, {
        data: {
          title: 'Erro!',
          msg: 'Usuário sem permissão para acessar essa função',
          showCancel: false
        }
      });
    } else {
      if (entity.Status === 0 || (entity.Status === 3 && this.currentUsuario.Perfil === 'DiretorFinanceiro')) {
        this.dialog.open(ModalComponent, { data: { msg: 'Confirma a aprovação da Proposta?' } })
          .afterClosed().subscribe(ok => {
            if (ok) {
              this.isLoading = true;
              this.service.aprovar(entity.ID).subscribe((res: any) => {
                let index = this.propostas.indexOf(entity);
                this.propostas.splice(index, 1);
                this.refreshTable();
                this.dialog.open(ModalComponent, { data: { msg: res.Mensagem, showCancel: false } });
                this.isLoading = false;
              }, err => {
                this.dialog.open(ModalComponent, { data: { title: 'Erro!', msg: err.Mensagem, showCancel: false } })
                this.isLoading = false;
              })
            }
          });
      } else {
        this.dialog.open(ModalComponent, {
          data: {
            title: 'Aviso!',
            msg: 'Não é possível aprovar essa proposta, pois não está em aberto',
            showCancel: false
          }
        });
      }
    }
  }

  reprovar(entity: Proposta) {
    if (this.currentUsuario.Perfil === 'AnalistaComercial') {
      this.dialog.open(ModalComponent, {
        data: {
          title: 'Aviso!',
          msg: 'Usuário sem permissão para acessar essa função',
          showCancel: false
        }
      });
    } else {
      if (entity.Status === 0 || (entity.Status === 3 && this.currentUsuario.Perfil === 'DiretorFinanceiro')) {
        this.dialog.open(ModalComponent, { data: { msg: 'Confirma a reprovação da Proposta?' } })
          .afterClosed().subscribe(ok => {
            if (ok) {
              this.isLoading = true;
              this.service.reprovar(entity.ID).subscribe((res: any) => {
                let index = this.propostas.indexOf(entity);
                this.propostas.splice(index, 1);
                this.refreshTable();
                this.dialog.open(ModalComponent, { data: { msg: res.Mensagem, showCancel: false } });
                this.isLoading = false;
              }, err => {
                this.dialog.open(ModalComponent, { data: { title: 'Erro!', msg: err.Mensagem, showCancel: false } })
                this.isLoading = false;
              })
            }
          });
      } else {
        this.dialog.open(ModalComponent, {
          data: {
            title: 'Aviso!',
            msg: 'Não é possível reprovar essa proposta, pois ela encontra-se ' + entity.StatusStr,
            showCancel: false
          }
        });
      }
    }
  }
}
