import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDirDialogComponent } from './delete-dir-dialog.component';

describe('DeleteDirDialogComponent', () => {
  let component: DeleteDirDialogComponent;
  let fixture: ComponentFixture<DeleteDirDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDirDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDirDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
