import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FiltroProposta } from '../../../models/filtroProposta';
import { Utils } from '../../../helpers/utils';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../models/categoria';
//import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-proposta-filtro',
  templateUrl: './proposta-filtro.component.html',
  styleUrls: ['./proposta-filtro.component.css']
})
export class PropostaFiltroComponent implements OnInit {
  
  @Output() filterMsg = new EventEmitter<FiltroProposta>();
  //filterCollapse = new EventEmitter<string|MaterializeAction>();
  
  filtro: FiltroProposta;
  maskData = Utils.masks.data;
  categorias: Categoria[];
  statusProposta = [
    { description: 'Em Aberto', value: 0 },
    { description: 'Aprovada', value: 1 },
    { description: 'Reprovada', value: 2 },
    { description: 'Pendente Diretoria', value: 3 }
  ];
  
  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.filtro = new FiltroProposta();
    this.categoriaService.listar().subscribe((res: Categoria[]) => {
      this.categorias = res;
    })
  }

  sendFilter() {
    //this.filterCollapse.emit( { action: 'collapsible', params:['close', '0'] });
    this.filterMsg.emit(this.filtro);
  }

}
