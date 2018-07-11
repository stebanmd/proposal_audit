import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Utils } from '../../helpers/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any;
  cpfMask = Utils.masks.cpf;

  constructor(private router: Router, private usuarioServ: UsuarioService) { }

  ngOnInit() {
    if (localStorage.getItem('BearerTokenKey') != null) {
      this.router.navigate(['home']);
    }
  }

  onSubmit(formData) {
    if (formData.valid) {
      var cpfOnlyNumbers = Utils.limpaMascara(formData.value.cpf);

      this.usuarioServ.auth(cpfOnlyNumbers, formData.value.senha)
        .subscribe((res: any) => {
          localStorage.setItem('BearerTokenKey', res.access_token);
          localStorage.setItem('CurrentUser', JSON.stringify({
            Nome: res.userName,
            ID: res.userId,
            Perfil: res.userProfile
          }));

          this.router.navigate(['home']);
        },
          (error) => {
            if (error instanceof Error) {
              this.error = 'O sistema encontra-se indisponível no momento.';
            } else if (error.status == -1 && error.data == null) {
              this.error = 'O sistema encontra-se indisponível no momento.';
            } else {
              this.error = error.error.error_description;
            }
          })
    }
    else {
      this.error = 'Por favor, preencha as informações corretamente.'
    }
  }

}
