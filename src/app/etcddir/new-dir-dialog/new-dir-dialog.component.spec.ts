import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDirDialogComponent } from './new-dir-dialog.component';

describe('NewDirDialogComponent', () => {
  let component: NewDirDialogComponent;
  let fixture: ComponentFixture<NewDirDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDirDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDirDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
