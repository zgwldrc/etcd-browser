import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Node } from '../../node'
import { KeysService } from '../../services/keys.service';
import { DeleteKeyDialogComponent } from '../del-key-confirm-modal/del-key-confirm-modal.component';
import { MatDialog, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-key-item',
  templateUrl: './key-item.component.html',
  styleUrls: ['./key-item.component.css']
})

export class KeyItemComponent implements OnInit {
  @Input() parent: Node
  @Input() node: Node
  isEditable: boolean = false
  constructor(
    private keysService: KeysService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    
  }

  edit(){
    this.isEditable = true;
  }

  deleteKey(){
    let dialogRef = this.dialog.open(DeleteKeyDialogComponent, {data: this.node.key});
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == "confirm") {
          this.keysService.deleteKey(this.node.key).subscribe(
            resp => {
              let index = this.parent.nodes.indexOf(this.node);
              this.parent.nodes.splice(index,1)
              this.parent.nodes = this.parent.nodes.slice()
            },
            err => console.log(err) 
          )
        }
      }
    )

  }
  
  setKey(){
    this.keysService.setKey(this.node.key, this.node.value).subscribe(
      () => {
        this.parent.nodes = this.parent.nodes.slice();
        this.isEditable = false
      }
    )
    
  }

  cancel(){
    this.isEditable = false
  }
}
