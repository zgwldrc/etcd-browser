import { TestBed, inject } from '@angular/core/testing';

import { KeysService } from './keys.service';

describe('KeysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeysService]
    });
  });

  it('should be created', inject([KeysService], (service: KeysService) => {
    expect(service).toBeTruthy();
  }));
});
