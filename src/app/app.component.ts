import { Component, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';

import { KeysService } from './services/keys.service';
import { Node } from './node';
import { ActivedEtcdDirService } from './services/actived-etcd-dir.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private activatedKeyService: ActivedEtcdDirService){}
  rootNode: Node = {key: "/"}
  activedNode: Node
  ngOnInit() {
    this.activatedKeyService.keyBus$.subscribe(
      node => this.activedNode = node
    )
  }  
}
