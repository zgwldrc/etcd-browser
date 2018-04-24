import { Component, OnInit, OnDestroy,Input, ViewContainerRef, ComponentFactoryResolver, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ActivedEtcdDirService } from '../services/actived-etcd-dir.service';
import { Node } from '../node'
import { KeysService } from '../services/keys.service';
import { KeyItemComponent } from './key-item/key-item.component';
import { Subscription } from 'rxjs';
import { AddKeyDialogComponent } from './add-key-dialog/add-key-dialog.component';
import { FlushDirService } from '../services/flush-dir.service';

@Component({
  selector: 'app-etcdkey',
  templateUrl: './etcdkey.component.html',
  styleUrls: ['./etcdkey.component.css']
})
export class EtcdkeyComponent implements OnInit,OnDestroy {
  constructor(
    private activatedKeyService: ActivedEtcdDirService,
    private keyService: KeysService,
    public dialog: MatDialog,
    private flushDirService: FlushDirService,
  ) { }
  @Input() node: Node
  activeKeySubscription: Subscription
  ngOnInit() {
    this.activeKeySubscription = this.activatedKeyService.keyBus$.subscribe(
      node => {
        this.node = node;
      }
    )
  }
  openAddKeyDialog(){
    this.dialog.open(AddKeyDialogComponent).afterClosed().subscribe(
      (kvpair: string[]) => {
        if (kvpair.length == 2) {
          let keypath = ''
          if (this.node.key == '/') {
            keypath = this.node.key + kvpair[0]
          } else {
            keypath = [this.node.key, kvpair[0]].join('/')
          }
          this.keyService.setKey(keypath, kvpair[1]).subscribe(
            () => {
              this.flushDirService.flush(this.node.key);
            }
          )
        }
      }
    )
  }


  ngOnDestroy(){
    this.activeKeySubscription.unsubscribe()
  }
  
}
