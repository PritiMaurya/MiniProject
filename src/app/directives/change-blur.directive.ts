import {Directive, ElementRef} from '@angular/core';
import {ApiService} from "../services/api.service";

@Directive({
  selector: '[appChangeBlur]'
})
export class ChangeBlurDirective {

  constructor(el: ElementRef, private apiService: ApiService) {
    if (apiService.blur) {
      el.nativeElement.style.filter = 'blur(1px)';
    }
  }

}
