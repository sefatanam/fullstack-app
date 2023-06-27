import { Directive, ElementRef, HostListener } from '@angular/core';
import { environment } from '../../../environments/environment';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[defaultImg]',
  standalone: true,
})
export class DefaultImgDirective {
  constructor(private el: ElementRef) {}

  @HostListener('error')
  onError() {
    this.setDefaultImage();
  }

  private setDefaultImage() {
    const imgElement: HTMLImageElement = this.el.nativeElement;
    imgElement.src = environment.defaultImagePath;
  }
}
