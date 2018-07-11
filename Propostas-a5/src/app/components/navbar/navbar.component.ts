import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() showLoader: boolean = true;
  
  
  constructor(private router: Router) { }
  ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem('CurrentUser'));    
    $("#logoffLink").attr('data-tooltip', 'Usuário atual: ' + currentUser.Nome)
    $("#logoffLinkSide").attr('data-tooltip', 'Usuário atual: ' + currentUser.Nome)    
  }

  logOff() {
    localStorage.removeItem('BearerTokenKey');
    localStorage.removeItem('CurrentUser');
    this.router.navigate(['login']);
    return false;
  }

}
