import { Component, OnInit, Input } from '@angular/core';
import { Proposta } from '../../../models/proposta';

@Component({
  selector: 'app-proposta-resumo',
  templateUrl: './proposta-resumo.component.html',
  styleUrls: ['./proposta-resumo.component.css']
})
export class PropostaResumoComponent implements OnInit {

  @Input() proposta: Proposta;
  constructor() { }

  ngOnInit() {
  }
}
