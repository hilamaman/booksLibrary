import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUpper'
})
export class ToUpperPipe implements PipeTransform {

  transform(value: string, args: any[]): string {
    if (value === null || value === undefined) {
      return '';
    }
      return value.toLowerCase().split(' ').map(function (word) {
        return word[0] === undefined ? '' + word.substr(1) : word[0].toUpperCase() + word.substr(1);
      }).join(' ');
  }

}
