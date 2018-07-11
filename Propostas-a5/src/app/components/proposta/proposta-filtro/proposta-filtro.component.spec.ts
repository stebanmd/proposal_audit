import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaFiltroComponent } from './proposta-filtro.component';

describe('PropostaFiltroComponent', () => {
  let component: PropostaFiltroComponent;
  let fixture: ComponentFixture<PropostaFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
