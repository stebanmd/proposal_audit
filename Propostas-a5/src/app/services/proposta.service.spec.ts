import { TestBed, inject } from '@angular/core/testing';

import { PropostaService } from './proposta.service';

describe('PropostaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropostaService]
    });
  });

  it('should be created', inject([PropostaService], (service: PropostaService) => {
    expect(service).toBeTruthy();
  }));
});
