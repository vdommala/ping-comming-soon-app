import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-notify-me',
  templateUrl: './notify-me.component.html',
  styleUrls: ['./notify-me.component.css'],
})
export class NotifyMeComponent implements OnInit {
  notifyForm!: FormGroup;
  controlErrors!: ValidationErrors | null | undefined;
  get userEmail() {
    return this.notifyForm.controls.userEmail;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.notifyForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    console.log(this.controlErrors);
    this.controlErrors = undefined;
    this.userEmail.updateValueAndValidity();
    if (this.userEmail.untouched) {
      this.userEmail.markAsTouched({ onlySelf: true });
    }
    if (this.userEmail.hasError('required'))
      this.controlErrors = this.userEmail.errors;
    else if (this.userEmail.hasError('email')) {
      this.controlErrors = this.userEmail.errors;
      this.userEmail.setValue('');
    } else {
      console.log(this.controlErrors);
      console.log('success');
    }
  }
}
