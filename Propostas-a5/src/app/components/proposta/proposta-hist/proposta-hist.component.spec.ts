import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaHistComponent } from './proposta-hist.component';

describe('PropostaHistComponent', () => {
  let component: PropostaHistComponent;
  let fixture: ComponentFixture<PropostaHistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaHistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
