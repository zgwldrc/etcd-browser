import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Node } from '../../node'
import { KeysService } from '../../services/keys.service';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
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
  @ViewChild('tt') public tooltip: NgbTooltip;
  constructor(
    private keysService: KeysService,
    private modalService: NgbModal,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    
  }
  // 这里设置isCopyied标记告知Tooltip的mouseleave事件处理函数不要关闭tooltip
  // 只有当isCopied为false时，才能关闭tooltip
  isCopied = false
  showCopyTooltip(message: string){
    this.isCopied = true
    this.tooltip.close()
    this.tooltip.open({content: message})
    setTimeout(
      () => {
        this.tooltip.close();
        this.isCopied=false;
      },
      1000
    )
  }

  tooltipToggle(){
    if (!this.isCopied) {
      this.tooltip.toggle();
    }
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
