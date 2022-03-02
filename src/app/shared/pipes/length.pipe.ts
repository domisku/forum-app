import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length',
})
export class LengthPipe implements PipeTransform {
  transform(value: unknown[] | null) {
    if (Array.isArray(value)) {
      return value.length;
    } else {
      return value;
    }
  }
}
