import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Utils } from '../../../helpers/utils';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {
  categoria = new Categoria();
  isLoading: boolean = true;
  erros: string[] = [];

  constructor(private service: CategoriaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      if (res.id !== '0') {
        this.service.carregar(parseInt(res.id))
          .subscribe((retorno: Categoria) => {
            this.categoria = retorno;
            this.isLoading = false;
          })
      } else this.isLoading = false;
    });
  }

  salvar() {
    this.isLoading = true;

    if (this.isValid()) {
      this.service.salvar(this.categoria).subscribe((res: any) => {
        if (res.Sucesso) {
          this.router.navigateByUrl('/categoria');
        } else {
          this.erros.push(res.Mensagem);
        }
        this.isLoading = false;
      },
        (err) => {
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
    if (Utils.isNullOrEmpty(this.categoria.Nome)) {
      this.erros.push('Informe o nome da Categoria')
    }
    if (Utils.isNullOrEmpty(this.categoria.Descricao)) {
      this.erros.push('Informe a descrição da Categoria')
    }
    return this.erros.length == 0;
  }

}
