import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, length: number = 50): string {
    if (value.length > length) {
      return `${value.substring(0, length+1)}...`
    }
    return value
  }

}
