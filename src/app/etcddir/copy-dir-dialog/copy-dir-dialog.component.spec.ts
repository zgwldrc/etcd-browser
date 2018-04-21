import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyDirDialogComponent } from './copy-dir-dialog.component';

describe('CopyDirDialogComponent', () => {
  let component: CopyDirDialogComponent;
  let fixture: ComponentFixture<CopyDirDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyDirDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyDirDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
