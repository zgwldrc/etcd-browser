import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { KeysService } from './services/keys.service';
import { EtcddirComponent } from './etcddir/etcddir.component';
import { ValuekeyPipe } from './valuekey.pipe';
import { DirkeyPipe } from './dirkey.pipe';
import { KeynamePipe } from './keyname.pipe';
import { EtcdkeyComponent } from './etcdkey/etcdkey.component';
import { ActivedEtcdDirService } from './services/actived-etcd-dir.service';
import { KeyItemComponent } from './etcdkey/key-item/key-item.component';
import { DeleteKeyDialogComponent } from './etcdkey/del-key-confirm-modal/del-key-confirm-modal.component';
import { FlushDirService } from './services/flush-dir.service';
import { ClipboardModule } from 'ngx-clipboard';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { NewDirDialogComponent } from './etcddir/new-dir-dialog/new-dir-dialog.component';
import { DeleteDirDialogComponent } from './etcddir/delete-dir-dialog/delete-dir-dialog.component';
import { CopyDirDialogComponent } from './etcddir/copy-dir-dialog/copy-dir-dialog.component';
import { AddKeyDialogComponent } from './etcdkey/add-key-dialog/add-key-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    EtcddirComponent,
    ValuekeyPipe,
    DirkeyPipe,
    KeynamePipe,
    EtcdkeyComponent,
    KeyItemComponent,
    DeleteKeyDialogComponent,
    NewDirDialogComponent,
    DeleteDirDialogComponent,
    CopyDirDialogComponent,
    AddKeyDialogComponent
  ],
  entryComponents:[
    KeyItemComponent,
    DeleteDirDialogComponent,
    NewDirDialogComponent,
    CopyDirDialogComponent,
    DeleteKeyDialogComponent,
    AddKeyDialogComponent,
  ],
  imports: [
    CustomMaterialModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ClipboardModule
  ],
  providers: [KeysService, ActivedEtcdDirService,FlushDirService],
  bootstrap: [AppComponent]
})
export class AppModule { }
