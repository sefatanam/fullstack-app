import { Pipe, PipeTransform } from '@angular/core';
import { environment } from "../../../environments/environment";

@Pipe({
  name: 'imageNotFound',
  standalone:true,
})
export class ImageNotFoundPipe implements PipeTransform {
  transform(src: string): string {
    return this.isImageAvailable(src) ? src : environment.defaultImagePath;
  }

  private isImageAvailable(src: string): boolean {
    const img = new Image();
    img.src = src;
    return img.complete && img.naturalWidth !== 0;
  }
}
