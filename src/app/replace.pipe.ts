import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'replaceAscii'})
export class ReplaceAscii implements PipeTransform {
  transform(value: string): string {
    return value.replace(/&#39;/, "'");
  }
}
