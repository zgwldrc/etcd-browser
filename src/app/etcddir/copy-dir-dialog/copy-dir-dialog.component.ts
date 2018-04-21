import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-copy-dir-dialog',
  templateUrl: './copy-dir-dialog.component.html',
  styleUrls: ['./copy-dir-dialog.component.css']
})
export class CopyDirDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public originKey: any) { }
  dirname: string = this.originKey + 'Copy'
  ngOnInit() {
  }
  
}
