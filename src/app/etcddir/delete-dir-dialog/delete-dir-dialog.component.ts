import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-delete-dir-dialog',
  templateUrl: './delete-dir-dialog.component.html',
  styleUrls: ['./delete-dir-dialog.component.css']
})
export class DeleteDirDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public targetToBeDeleted: string) { }
  ngOnInit() {
  }

}
