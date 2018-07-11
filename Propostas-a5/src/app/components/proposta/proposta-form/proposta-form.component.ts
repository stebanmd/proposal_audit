import { Component, OnInit, EventEmitter } from '@angular/core';
import { Proposta } from '../../../models/proposta';
import { PropostaService } from '../../../services/proposta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { CategoriaService } from '../../../services/categoria.service';
import { FornecedorService } from '../../../services/fornecedor.service';
import { Categoria } from '../../../models/categoria';
import { Fornecedor } from '../../../models/fornecedor';
import { Utils } from '../../../helpers/utils';
import { UploadArquivo } from '../../../models/uploadArquivo';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-proposta-form',
  templateUrl: './proposta-form.component.html',
  styleUrls: ['./proposta-form.component.css']
})
export class PropostaFormComponent implements OnInit {

  constructor(
    private categoriaServ: CategoriaService,
    private fornecedorServ: FornecedorService,
    private propostaServ: PropostaService,
    private router: Router,
    private route: ActivatedRoute) { }

  dataActions = new EventEmitter<string | MaterializeAction>();
  proposta = new Proposta();
  isLoading = true;
  erros: string[] = [];
  datePikerParams = {
    format: 'dd/mm/yyyy', 
    selectYears: 15, 
    selectMonths: true, 
    today: 'Hoje',
    clear: 'Limpar',
    monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  }

  categorias: Categoria[];
  fornecedores: Fornecedor[];
  arquivo: UploadArquivo;

  ngOnInit() {
    this.route.params.subscribe(par => {
      if (par.id !== '0') {
        this.propostaServ.carregar(par.id).subscribe((res: Proposta) => {
          this.proposta = res;
          this.proposta.DataMask = Utils.toLocalDate(this.proposta.Data);
          if (this.proposta.Arquivo) {
            this.proposta.CaminhoArquivo = environment.apiEndpoint + '/' + this.proposta.CaminhoArquivo;
          }
          this.isLoading = false;
        })
      } else {
        this.proposta.DataMask = Utils.toLocalDate(new Date());
      }
      this.carregaCategorias();
      this.carregaFornecedores();
    })
  }

  private carregaCategorias() {
    this.isLoading = true;
    this.categoriaServ.listar().subscribe((res: Categoria[]) => {
      this.categorias = res;
      this.isLoading = false;
    })
  }

  private carregaFornecedores() {
    this.isLoading = true;
    this.fornecedorServ.listar().subscribe((res: Fornecedor[]) => {
      this.fornecedores = res;
      this.isLoading = false;
    })
  }

  salvar() {
    this.isLoading = true;

    if (this.isValid()) {

      this.proposta.Data = Utils.toSystemDate(this.proposta.DataMask);
      this.propostaServ.salvar(this.proposta).subscribe((res: any) => {
        if (res.Sucesso) {

          if (this.arquivo && !Utils.isNullOrEmpty(this.arquivo.ArquivoBase64)) {
            this.arquivo.IdProposta = res.Retorno.ID;

            this.propostaServ.uploadArquivo(this.arquivo).subscribe((resp:any) => {
              if (resp.Sucesso) {
                this.proposta = undefined;
                this.arquivo = undefined;
                this.router.navigateByUrl('/proposta');
              }
              else {
                this.erros.push(resp.Mensagem);
              }
            }, err => {
              var msg = 'Não foi possível efetuar o upload do arquivo!';
              if (err.hasOwnProperty('Mensagem')) {
                msg = err.Mensagem;
              }
              this.erros.push(msg);
              this.isLoading = false;
            })              
          }
          else {
            this.proposta = undefined;
            this.router.navigateByUrl('/proposta');
          }
        } else {
          this.erros.push(res.Mensagem);
        }
        this.isLoading = false;
      }, (err) => {
        var msg = 'Não é possível salvar o registro. Por favor contacte o administrador';
        if (err.hasOwnProperty('Mensagem')) {
          msg = err.data.Mensagem;
        }
        this.erros.push(msg);
        this.isLoading = false;
      })
    } else {
      this.isLoading = false;
    }
  }

  private isValid(): boolean {
    this.erros = [];

    if (Utils.isNullOrEmpty(this.proposta.Nome)) {
      this.erros.push('Informe o nome');
    }
    if (typeof this.proposta.DataMask === 'undefined' || this.proposta.DataMask == '' || (!Utils.isValidDate(this.proposta.DataMask))) {
      this.erros.push('Informe uma data válida');
    }
    if (this.proposta.IdCategoria === 0 || this.proposta.IdCategoria === undefined) {
      this.erros.push('Informe a categoria');
    }
    if (this.proposta.IdFornecedor === 0 || this.proposta.IdFornecedor === undefined) {
      this.erros.push('Informe o fornecedor');
    }
    if (this.proposta.Valor === 0 || this.proposta.Valor === '' || this.proposta.Valor === undefined) {
      this.erros.push('Informe o valor da proposta.');
    }
    return this.erros.length == 0;
  }

  selectFileChange($event) {    
    if ($event.target && $event.target.files[0]) {
      this.arquivo = new UploadArquivo();

      Utils.getBase64($event.target.files[0])
        .then((response) => {
          var arquivo = response.replace(/^data:([a-z]?[\/\-\.]?)+;base64,/, '');
          this.arquivo.ArquivoBase64 = arquivo;
          this.arquivo.NomeArquivo = $event.target.files[0].name;
          this.arquivo.Extensao = $event.target.files[0].name.substr($event.target.files[0].name.lastIndexOf('.'));
        })
    }
  }

}
