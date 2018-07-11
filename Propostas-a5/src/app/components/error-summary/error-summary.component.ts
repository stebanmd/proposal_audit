import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'error-summary',
  templateUrl: './error-summary.component.html',
  styleUrls: ['./error-summary.component.css']
})
export class ErrorSummaryComponent implements OnInit {

  @Input() errors: string[] = [];

  constructor() { }

  ngOnInit() {
  }

}
