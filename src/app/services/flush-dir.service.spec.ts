import { TestBed, inject } from '@angular/core/testing';

import { FlushDirService } from './flush-dir.service';

describe('FlushDirService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlushDirService]
    });
  });

  it('should be created', inject([FlushDirService], (service: FlushDirService) => {
    expect(service).toBeTruthy();
  }));
});
