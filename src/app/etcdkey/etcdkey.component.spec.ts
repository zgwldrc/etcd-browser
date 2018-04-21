import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtcdkeyComponent } from './etcdkey.component';

describe('EtcdkeyComponent', () => {
  let component: EtcdkeyComponent;
  let fixture: ComponentFixture<EtcdkeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtcdkeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtcdkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
