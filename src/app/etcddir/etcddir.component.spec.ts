import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtcddirComponent } from './etcddir.component';

describe('EtcddirComponent', () => {
  let component: EtcddirComponent;
  let fixture: ComponentFixture<EtcddirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtcddirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtcddirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
