import { Component, OnInit, Input, Output ,HostListener, ViewChild} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatMenuTrigger, MatDialog } from '@angular/material';
import { MatSnackBar} from '@angular/material';
import { Node} from '../node';
import { KeysService} from '../services/keys.service';
import { ActivedEtcdDirService } from '../services/actived-etcd-dir.service';
import { FlushDirService } from '../services/flush-dir.service';
import { Subscription } from 'rxjs';

import { NewDirDialogComponent } from './new-dir-dialog/new-dir-dialog.component';
import { DeleteDirDialogComponent } from './delete-dir-dialog/delete-dir-dialog.component';
import { CopyDirDialogComponent } from './copy-dir-dialog/copy-dir-dialog.component';
@Component({
  selector: 'app-etcddir',
  templateUrl: './etcddir.component.html',
  styleUrls: ['./etcddir.component.css']
})
export class EtcddirComponent implements OnInit {
  constructor(
    private keysService: KeysService,
    private activatedKeyService: ActivedEtcdDirService,
    private flushDirService:FlushDirService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  @Input() node: Node
  @Input() parentNode: Node
  @Input() depth: number
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  keyBusSubscription: Subscription
  flushJobSubscription: Subscription
  ngOnInit() {
    this.setClass()
    if(this.node.key == "/") {this.toggle()}
    this.keyBusSubscription = this.activatedKeyService.keyBus$.subscribe(
      node => this.amIActivated(node)
    )
    this.flushJobSubscription = this.flushDirService.infoChan.subscribe(
      keypath => {
        if (keypath == this.node.key) {
          this.loadNodes()
        }
      }
    )
  }
  ngOnDestory(){
    this.keyBusSubscription.unsubscribe();
    this.flushJobSubscription.unsubscribe();
  }

  openMenuAndStopPropagation(event: MouseEvent) {
    this.trigger.openMenu();
    event.stopPropagation();
  }
  eventListener(event: string){
    if (event == 'flush') {
      this.loadNodes()
    }
  }

  isOpen: boolean = false
  hasLoaded: boolean = false

  
  itemIconFont="folder"
  aClasses = {}
  setClass(){
    this.aClasses={
      'nav-link': true,
      'active': this.isActivated
    }
  }



  loadNodes(){
    this.keysService.getSubNodes(this.node.key).subscribe(
      nodes => { 
        this.node.nodes = nodes;
        this.hasLoaded = true;
      }
    )
  }

  refreshNodes(){
    this.keysService.getSubNodes(this.node.key).subscribe(
      nodes => { 
        this.node.nodes = nodes;
        this.hasLoaded = true;
        this.snackBar.open("目录刷新成功","",{duration: 2000});
      }
    )
  }

  createDir(path: string){
    this.keysService.createDir(path).subscribe(
      node => {
        this.loadNodes();
      },
      err => console.log(err)
    )
  }

  recursiveCreate(node: Node, oriPath:string, newPath:string) {
    node.key = node.key.replace(oriPath, newPath);
    this.keysService.createDir(node.key).subscribe();
    for (var i in node.nodes) {
      if (node.nodes[i].dir) {
        this.recursiveCreate(node.nodes[i], oriPath, newPath);
      } else {
        node.nodes[i].key = node.nodes[i].key.replace(oriPath, newPath);
        this.keysService.setKey(node.nodes[i].key, node.nodes[i].value).subscribe();
      }
    }
  }

  copyDir():void{
    let dialogRef = this.dialog.open(CopyDirDialogComponent,{data:this.node.key});
    dialogRef.afterClosed().subscribe(
      newPath => {
        if (newPath == '' || newPath == '/'|| newPath == this.node.key){
          return
        }
        this.keysService.getDirRecursively(this.node.key).subscribe(
          (node) => {
            this.recursiveCreate(node, node.key, newPath);
          }
        )
      }
    )    
  }
  // 通过activatedKeyService广播本Node是激活的
  activeNode(node: Node){
    this.activatedKeyService.broadcastkey(node);
  }
  // amIActivated通过监听activatedKeyService的消息总线来实时改变自身激活状态
  isActivated = false
  amIActivated(node: Node){
    this.isActivated = node.key == this.node.key ? true: false
  }

  toggle(){
    if (!this.isOpen) {
      if(!this.hasLoaded) {
        this.loadNodes()
      }
    }
    this.isOpen = !this.isOpen
    this.activeNode(this.node)
  }

  openNewDirDialog(): void{
    let dialogRef = this.dialog.open(NewDirDialogComponent,{data:{prefix: this.node.key}});
    dialogRef.afterClosed().subscribe(
      dirpath => {
        this.createDir(dirpath)
      }
    )
  }

  openDeleteDirDialog(){
    let dialogRef = this.dialog.open(DeleteDirDialogComponent,{data: this.node.key});
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == "confirm"){
          this.keysService.deleteDir(this.node.key).subscribe(
            resp => {
              this.flushDirService.flush(this.parentNode.key)
            },
            err => console.log(err)
          )
        }
      }
    )
  }
}
