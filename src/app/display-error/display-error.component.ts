import { Component, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-display-error',
  templateUrl: './display-error.component.html',
  styleUrls: ['./display-error.component.css'],
})
export class DisplayErrorComponent implements OnInit {
  validationMessages: { [key: string]: string } = {
    required: 'Whoops! It looks like you forgot to add your email',
    email: 'Please provide a valid email.',
  };

  errorMessage?: string | null;

  @Input()
  get errors(): ValidationErrors | null | undefined {
    return this._errors;
  }
  set errors(errors: ValidationErrors | null | undefined) {
    this._errors = errors;
    if (this._errors) {
      this.setErrorMessage(this._errors);
    }
  }

  private _errors?: ValidationErrors | null;
  constructor() {}
  ngOnInit(): void {}

  setErrorMessage(errors: ValidationErrors): void {
    this.errorMessage = Object.keys(errors)
      .map((key) => this.validationMessages[key])
      .join('');
  }
}
