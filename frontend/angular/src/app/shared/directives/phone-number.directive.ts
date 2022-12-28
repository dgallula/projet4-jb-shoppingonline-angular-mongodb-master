import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneNumber]',
})
export class PhoneNumberDirective {
  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    const trimmed = input.value
      .replace(/\s+/g, '')
      .slice(0, input.value.indexOf('-') == -1 ? 5 : 11);

    if (trimmed.length > 4) {
      input.value = `${trimmed.slice(0, 3)}-${trimmed.slice(
        trimmed.indexOf('-') == -1 ? 3 : 4
      )}`;
    }
    return input;
  }
}
