import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Node } from '../node'
import { environment } from '../../environments/environment'

@Injectable()
export class KeysService {

  constructor(
    private http: HttpClient
  ) {}

  private endpoint = environment.etcdEndPoint
  private url = `${location.protocol}//${this.endpoint}/v2/keys`

  setKey(keypath: string, value: string) {
    return this.http.put(this.url + keypath, null,{params: new HttpParams().append("value",value)})
  }
  getNode(keypath?: string): Observable<Node> {
    return this.http.get<any>(this.url + keypath).pipe(map(data => data.node))
  }
  getDirRecursively(keypath: string): Observable<Node> {
    return this.http.get<any>(this.url + keypath,{params: new HttpParams().append("recursive","true")}).pipe(map(data => data.node))
  }
  createDir(path: string): Observable<Node> {
    let p =  new HttpParams().append("dir","true")
    return this.http.put<any>(this.url + path, null,{params: p}).pipe(map(data => data.node))
  }

  deleteDir(path: string): Observable<any> {
    return this.http.delete<any>(
      this.url + path,
      {params: new HttpParams().append("recursive","true")}
    )
  }

  deleteKey(path: string): Observable<any> {
    return this.http.delete<any>(
      this.url + path
    )
  }

  getSubNodes(keypath?: string): Observable<Node[]> {
    return this.http.get<any>(this.url + keypath).pipe(
      map(data => {
        if (data.node.nodes) {
          return data.node.nodes.sort((a,b)=> a.key.localeCompare(b.key))
        }else {
          return []
        }
      })
    )
  }
}
