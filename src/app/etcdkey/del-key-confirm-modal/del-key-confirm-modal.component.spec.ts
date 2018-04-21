import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteKeyDialogComponent } from './del-key-confirm-modal.component';

describe('DelKeyConfirmModalComponent', () => {
  let component: DeleteKeyDialogComponent;
  let fixture: ComponentFixture<DeleteKeyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteKeyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteKeyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
