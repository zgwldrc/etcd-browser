import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyname'
})
export class KeynamePipe implements PipeTransform {

  transform(key: string): string {
    if (key == '/') {
      return 'root'
    }
    return key.substring(key.lastIndexOf('/')+1)
  }

}
