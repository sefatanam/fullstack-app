import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageNotFound',
})
export class ImageNotFoundPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
