import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Categoria } from '../models/categoria';

@Injectable()
export class CategoriaService {

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get(environment.apiEndpoint + '/api/categoria/listar');
  }

  carregar(id: number) {
    return this.http.get(environment.apiEndpoint + '/api/categoria/carregar/' + id);
  }

  salvar(categoria: Categoria) {
    return this.http.post(environment.apiEndpoint + '/api/categoria/salvar', categoria);
  }

  remover(id: number) {
    return this.http.delete(environment.apiEndpoint + '/api/categoria/remover/' + id);
  }
}
