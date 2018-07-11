import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentId: number;
  constructor() { }

  ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    this.currentId = currentUser.ID;
  }
}


