import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-key-dialog',
  templateUrl: './add-key-dialog.component.html',
  styleUrls: ['./add-key-dialog.component.css']
})
export class AddKeyDialogComponent implements OnInit {

  constructor() { }
  key: string
  value: string
  ngOnInit() {
  }

}
