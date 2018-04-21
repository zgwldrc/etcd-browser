import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FlushDirService {

  private flushChan = new Subject<string>();
  public infoChan = this.flushChan.asObservable();
  flush(keypath: string){
    this.flushChan.next(keypath)
  }
}
