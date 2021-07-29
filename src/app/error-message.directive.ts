import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';

@Directive({
  selector: '[appErrorMessage]',
})
export class ErrorMessageDirective implements OnInit {
  @HostBinding('attr.aria-invalid')
  get ariaInvalid(): boolean | null {
    return (
      this.control !== undefined &&
      this.control !== null &&
      this.control.invalid &&
      (this.control.touched || this.control.dirty)
    );
  }

  @HostBinding('attr.aria-errormessage')
  get ariaErrorMessage(): string | null {
    return this.control !== undefined &&
      this.control !== null &&
      this.control.invalid &&
      (this.control.touched || this.control.dirty) &&
      this.appErrorMessage
      ? this.appErrorMessage
      : null;
  }

  @HostListener('blur') onBlur() {
    const emailInput: HTMLElement = this.el.nativeElement;
    if (this.control?.errors?.email) {
      this.renderer.setAttribute(emailInput, 'placeholder', 'name@host.tld');
    }
  }

  @Input()
  public appErrorMessage?: string;
  @Input()
  formControlName?: string;
  @Input()
  formControl?: AbstractControl;
  private control?: AbstractControl | null;

  constructor(
    private controlContainer: ControlContainer,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (this.formControl) {
      this.control = this.formControl;
    }
    if (!this.formControlName) {
      throw new Error('control  or control name should be give');
    }
    if (!(this.controlContainer && this.controlContainer.control))
      throw new Error('Parent Control not found');

    this.control = this.controlContainer.control.get(this.formControlName);
  }
}
