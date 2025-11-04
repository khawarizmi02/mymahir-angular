import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convert',
})
export class ConvertPipe implements PipeTransform {
  transform(value: any, ...args: any): string | null {
    if (args == 'upperCase') {
      return String(value).toUpperCase();
    }
    return null;
  }
}
