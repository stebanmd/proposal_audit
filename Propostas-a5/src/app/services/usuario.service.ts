import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario';

@Injectable()

export class UsuarioService {

  constructor(private http: HttpClient) { }

  auth(cpf:string, pass:string) {
    let headerAuth = new HttpHeaders({
      "Content-type": "application/x-www-form-urlencoded",
      "no-auth": "true"
    });
    let data = 'username='+cpf+'&password='+pass+'&grant_type=password';
    return this.http.post(environment.apiEndpoint + '/auth', data, { headers: headerAuth })
  }

  listar() {
    return this.http.get(environment.apiEndpoint + '/api/usuario/listar');
  }

  carregar(id: number) {
    return this.http.get(environment.apiEndpoint + '/api/usuario/carregar/' + id)
  }

  remover(id: number) {
    return this.http.delete(environment.apiEndpoint + '/api/usuario/remover/' + id);
  }

  salvar(usuario: Usuario) {
    return this.http.post(environment.apiEndpoint + '/api/usuario/salvar', usuario);
  }

  mudarSenha(mudarSenha: any) {
    return this.http.post(environment.apiEndpoint + '/api/usuario/mudar-senha', mudarSenha);
  }

}
