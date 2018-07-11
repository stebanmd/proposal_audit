import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Proposta } from '../models/proposta';
import { FiltroProposta } from '../models/filtroProposta';
import { UploadArquivo } from '../models/uploadArquivo';

@Injectable()
export class PropostaService {

  constructor(private http: HttpClient) { }

  pesquisar(filtro: FiltroProposta) {
    return this.http.post(environment.apiEndpoint + '/api/proposta/pesquisar', filtro);
  }

  carregar(id: number) {
    return this.http.get(environment.apiEndpoint + '/api/proposta/carregar/' + id);
  }

  remover(id: number) {
    return this.http.delete(environment.apiEndpoint + '/api/proposta/remover/' + id);
  }

  salvar(proposta: Proposta) {
    return this.http.post(environment.apiEndpoint + '/api/proposta/gravar', proposta);
  }

  aprovar(id: number) {
    return this.http.put(environment.apiEndpoint + '/api/proposta/aprovar/' + id, {});
  }

  reprovar(id: number) {
    return this.http.put(environment.apiEndpoint + '/api/proposta/reprovar/' + id, {});
  }

  historico(id:number) {
    return this.http.get(environment.apiEndpoint + '/api/proposta/historico/' + id);
  }

  uploadArquivo(model: UploadArquivo) {
    return this.http.post(environment.apiEndpoint + '/api/proposta/upload-file', model);
  }
}
