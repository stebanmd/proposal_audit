import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropostaService } from '../../../services/proposta.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Proposta } from '../../../models/proposta';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-proposta-hist',
  templateUrl: './proposta-hist.component.html',
  styleUrls: ['./proposta-hist.component.css']
})
export class PropostaHistComponent implements OnInit {
  constructor(private service: PropostaService, private route: ActivatedRoute, private router: Router) { }
  
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
 
  proposta = new Proposta();
  isLoading = true;

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      searching: false,
      language: {
        url: './assets/localization/dataTables.language.json'
      },
    };

    this.route.params.subscribe(par => {
      if (par.id === '') {
        this.router.navigateByUrl('/proposta');
      }
      else {
        this.service.historico(par.id).subscribe((res: Proposta) => {
          this.proposta = res;
          if (this.proposta.Arquivo) {
            this.proposta.CaminhoArquivo = environment.apiEndpoint + '/' + this.proposta.CaminhoArquivo;
          }
          this.dtTrigger.next();
          this.isLoading = false;
        })
      }
    })
    
  }

}
