import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../../../services/fornecedor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Fornecedor } from '../../../models/fornecedor';
import { Utils } from '../../../helpers/utils';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.css']
})
export class FornecedorFormComponent implements OnInit {
  isLoading = true;
  fornecedor = new Fornecedor();
  tipoPessoa: string = 'F';
  cpfMask = Utils.masks.cpf;
  cnpjMask = Utils.masks.cnpj;
  erros: string[] = [];

  constructor(private service: FornecedorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(res => {
      if (res.id !== '0') {
        this.service.carregar(parseInt(res.id))
          .subscribe((retorno: Fornecedor) => {
            this.fornecedor = retorno;
            if (this.fornecedor.Documento.length > 11)
              this.tipoPessoa = 'J';
            this.isLoading = false;
          })
      } else this.isLoading = false;
    });
  }

  changePessoa() {
    this.fornecedor.Documento = '';
    this.fornecedor.DocumentoMask = '';
  }

  salvar() {
    this.isLoading = true;
    this.fornecedor.Documento = Utils.limpaMascara(this.fornecedor.DocumentoMask);

    if (this.isValid()) {
      this.service.salvar(this.fornecedor).subscribe((res: any) => {
        if (res.Sucesso) {
          this.router.navigateByUrl('/fornecedor');
        } else {
          this.erros.push(res.Mensagem);
        }
        this.isLoading = false;
      },
        err => {
          var msg = 'Não é possível salvar o registro. Por favor contacte o administrador';
          if (err != null && err.hasOwnProperty('Mensagem')) {
            msg = err.Mensagem;
          }
          this.erros.push(msg);
          this.isLoading = false;
        });

    } else this.isLoading = false;
  }

  private isValid(): boolean {
    this.erros = [];
    var doc = this.tipoPessoa =='F' ? 'CPF' : 'CNPJ';
    if (Utils.isNullOrEmpty(this.fornecedor.Nome)) {
      this.erros.push('Informe o nome do Fornecedor');
    }
    if (Utils.isNullOrEmpty(this.fornecedor.Documento)) {
      this.erros.push('Informe o ' + doc)
    } else if (!Utils.isValidCPFCNPJ(this.fornecedor.Documento)) {
      this.erros.push(doc + ' informado não é um documento válido.')
    }
    if (Utils.isNullOrEmpty(this.fornecedor.Email)) {
      this.erros.push('Informe o e-mail para contato')
    } else if (!Utils.isValidEmail(this.fornecedor.Email)) {
      this.erros.push('E-mail informado não é válido.')
    }

    return this.erros.length == 0;
  }

}
