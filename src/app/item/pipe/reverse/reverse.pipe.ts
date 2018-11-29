import { Pipe, PipeTransform } from '@angular/core';
import { reverse } from 'lodash';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {return; }

    return reverse(value);
  }

}
