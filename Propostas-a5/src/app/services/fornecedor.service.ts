import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Fornecedor } from '../models/fornecedor';

@Injectable()
export class FornecedorService {

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get(environment.apiEndpoint + '/api/fornecedor/listar');
  }

  carregar(id: number) {
    return this.http.get(environment.apiEndpoint + '/api/fornecedor/carregar/' + id);
  }

  salvar(fornecedor: Fornecedor) {
    return this.http.post(environment.apiEndpoint + '/api/fornecedor/salvar', fornecedor);
  }

  remover(id: number) {
    return this.http.delete(environment.apiEndpoint + '/api/fornecedor/remover/' + id);
  }
}
