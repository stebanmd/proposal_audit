import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaResumoComponent } from './proposta-resumo.component';

describe('PropostaResumoComponent', () => {
  let component: PropostaResumoComponent;
  let fixture: ComponentFixture<PropostaResumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaResumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
