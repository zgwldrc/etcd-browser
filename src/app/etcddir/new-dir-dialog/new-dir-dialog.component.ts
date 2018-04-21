import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-dir-dialog',
  templateUrl: './new-dir-dialog.component.html',
  styleUrls: ['./new-dir-dialog.component.css']
})
export class NewDirDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewDirDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  @Input() prefix:string
  dirname: string
  ngOnInit() {
    this.prefix = this.data.prefix
  }
  get dirpath(): string {
    let dirpath = ''
    if (this.prefix == '/'){
      dirpath = this.prefix + this.dirname
    }else {
      dirpath = [this.prefix, this.dirname].join('/')
    }
    return dirpath
  }
}
