import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-del-key-confirm-modal',
  templateUrl: './del-key-confirm-modal.component.html',
  styleUrls: ['./del-key-confirm-modal.component.css']
})
export class DeleteKeyDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public targetToBeDeleted: string) { }
  ngOnInit() {
  }

}