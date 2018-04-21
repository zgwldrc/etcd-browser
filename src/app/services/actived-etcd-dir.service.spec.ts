import { TestBed, inject } from '@angular/core/testing';

import { ActivedEtcdDirService } from './actived-etcd-dir.service';

describe('ActivedEtcdDirService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivedEtcdDirService]
    });
  });

  it('should be created', inject([ActivedEtcdDirService], (service: ActivedEtcdDirService) => {
    expect(service).toBeTruthy();
  }));
});
