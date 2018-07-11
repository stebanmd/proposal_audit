import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Utils } from '../../../helpers/utils';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {
  usuario = new Usuario();
  isLoading = true;
  cpfMask = Utils.masks.cpf;
  dataMask = Utils.masks.data;
  erros: string[] = [];

  perfis = [
    { key: 0, value: 'Adminstrador' },
    { key: 1, value: 'Analista Comercial' },
    { key: 2, value: 'Analista Financeiro' },
    { key: 3, value: 'Diretor Financeiro' },
  ]

  constructor(private service: UsuarioService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.usuario.ID = 0;
    this.route.params.subscribe(res => {
      if (res.id !== '0') {
        this.service.carregar(res.id).subscribe(response => {
          this.usuario = <Usuario>response;
          this.usuario.DataNascMask = Utils.toLocalDate(this.usuario.DataNascimento);
          this.isLoading = false;
        }, err => {
          this.isLoading = false;
        })

      } else this.isLoading = false;
    })
  }

  salvar() {
    this.isLoading = true;

    this.usuario.CPF = Utils.limpaMascara(this.usuario.CPFMask);
    this.usuario.DataNascimento = Utils.toSystemDate(this.usuario.DataNascMask);

    if (this.isValid()) {
      this.service.salvar(this.usuario).subscribe((res: any) => {
        if (res.Sucesso) {
            this.router.navigateByUrl('/usuario');
        } else {
            this.erros.push(res.Mensagem);
        }
      this.isLoading = false;
      }, err => {
        var msg = 'Não é possível salvar o registro. Por favor contacte o administrador';
        if (err != null && err.hasOwnProperty('Mensagem')) {
            msg = err.Mensagem;
        }
        this.erros.push(msg);
        this.isLoading = false;
      })
    } else this.isLoading = false;

  }

  private isValid(): boolean {
    this.erros = [];

    if (Utils.isNullOrEmpty(this.usuario.Nome)) {
      this.erros.push('Informe o Nome;');
    }
    if (Utils.isNullOrEmpty(this.usuario.CPF)) {
      this.erros.push('Informe o CPF;');
    }
    else if (!Utils.isValidCPFCNPJ(this.usuario.CPF)) {
      this.erros.push('CPF inválido;');
    }
    if (typeof this.usuario.DataNascMask === 'undefined' || this.usuario.DataNascMask == '' || (!Utils.isValidBirthDate(this.usuario.DataNascMask))) {
      this.erros.push('Informe sua data de nascimento corretamente;');
    }
    if (this.usuario.ID === undefined || (this.usuario.ID !== undefined && this.usuario.ID == 0)) {
      if (Utils.isNullOrEmpty(this.usuario.Senha)) {
        this.erros.push('Informe a Senha;');
      }
    }

    return this.erros.length == 0;
  }
}
