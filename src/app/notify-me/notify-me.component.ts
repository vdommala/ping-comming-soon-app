import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { asapScheduler, asyncScheduler, queueScheduler, scheduled } from 'rxjs';
import { concatAll, debounceTime, startWith } from 'rxjs/Operators';

@Component({
  selector: 'app-notify-me',
  templateUrl: './notify-me.component.html',
  styleUrls: ['./notify-me.component.css'],
})
export class NotifyMeComponent implements OnInit {
  notifyForm!: FormGroup;
  controlErrors!: ValidationErrors | null;
  get userEmail() {
    return this.notifyForm.controls.userEmail;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.controlErrors = null;
    this.notifyForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    this.controlErrors = null;
    if (this.userEmail.untouched) {
    }
    if (this.userEmail.hasError('required'))
      this.controlErrors = this.userEmail.errors;
    else if (this.userEmail.hasError('email')) {
      this.controlErrors = this.userEmail.errors;
      this.userEmail.setValue('');
    } else {
      console.log('success');
    }
  }
}
