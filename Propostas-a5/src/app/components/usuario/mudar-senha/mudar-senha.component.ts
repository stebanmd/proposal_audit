import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MudarSenha } from '../../../models/mudarSenha';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-mudar-senha',
  templateUrl: './mudar-senha.component.html',
  styleUrls: ['./mudar-senha.component.css']
})
export class MudarSenhaComponent implements OnInit {
  isLoading = false;
  currentUser = JSON.parse(localStorage.getItem('CurrentUser'));

  showSenhaAtual = true;
  model: MudarSenha;
  erros: string[] = [];

  constructor(
    private service: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.model = new MudarSenha();

    this.route.params.subscribe(par => {
      if (par.id != this.currentUser.ID) {
        if (this.currentUser.Perfil != 'Administrador') {
          this.dialog.open(ModalComponent, {
            data: {
              title: 'Aviso!', msg: 'Você não possui permissão para alterar a senha de outros usuários!', showCancel: false
            }
          })
          this.router.navigate(['usuario']);
          return;
        }
        this.model.IdUsuario = par.id;
        this.model.UsuarioDiferente = true;
        this.showSenhaAtual = false;
      } else {
        this.model.UsuarioDiferente = false;
        this.model.IdUsuario = this.currentUser.ID;
      }
    });
  }

  salvar() {
    this.isLoading = true;

    if (this.isValid()) {
      this.service.mudarSenha(this.model).subscribe((res: any) => {
        if (res.Sucesso) {
          this.model = undefined;
          this.dialog.open(ModalComponent, { data: { msg: 'Senha alterada com sucesso!', showCancel: false } })
          this.router.navigate(['usuario']);
        }
        else {
          this.dialog.open(ModalComponent, { data: { title: 'Erro!', msg: res.Mensagem, showCancel: false } })

        }
        this.isLoading = false
      }, err => {
        var msg = 'Não é possível salvar o registro. Por favor contacte o administrador';
        if (err != null && err.hasOwnProperty('Mensagem')) {
          msg = err.Mensagem;
        }
        this.dialog.open(ModalComponent, { data: { title: 'Erro!', msg: msg, showCancel: false } });
      })

    } else this.isLoading = false;
  }

  private isValid(): boolean {
    this.erros = [];

    if (!this.model.UsuarioDiferente && (this.model.SenhaAtual == undefined || this.model.SenhaAtual === '')) {
      this.erros.push('Informar a senha atual');
    }
    if (this.model.NovaSenha == undefined || this.model.NovaSenha === '') {
      this.erros.push('Informe a nova senha');
    }
    if (this.model.ConfirmaSenha == undefined || this.model.ConfirmaSenha === '') {
      this.erros.push('Informe a confirmação da senha');
    }
    if (this.model.NovaSenha != this.model.ConfirmaSenha) {
      this.erros.push('Senhas não conferem.');
    }

    return this.erros.length == 0;
  }

}
