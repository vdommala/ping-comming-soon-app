import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { NotifyMeComponent } from './notify-me.component';
import { DisplayErrorComponent } from '../display-error/display-error.component';
import { MockComponent, MockDirective } from 'ng-mocks';
import { ErrorMessageDirective } from '../error-message.directive';
import { By } from '@angular/platform-browser';
import { findEl, fakeDispatchEvent, makeClick } from '../spec-helper';

describe('NotifyMeComponent', () => {
  let notifyComponent: NotifyMeComponent;
  let fixture: ComponentFixture<NotifyMeComponent>;
  let errorComponent: DisplayErrorComponent;
  let errorDirective: ErrorMessageDirective;

  beforeEach(async () => {
    //creating the testbed and compiling the template into javascript
    //compile components in async function
    await TestBed.configureTestingModule({
      declarations: [
        NotifyMeComponent,
        MockComponent(DisplayErrorComponent),
        MockDirective(ErrorMessageDirective),
      ],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    //rendering the component with static html
    fixture = TestBed.createComponent(NotifyMeComponent);
    notifyComponent = fixture.componentInstance;
    //for dynamic detection -template bindings
    errorComponent = fixture.debugElement.query(
      By.directive(DisplayErrorComponent)
    ).componentInstance;

    errorDirective = findEl(fixture, 'input').injector.get(
      ErrorMessageDirective
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(notifyComponent).toBeTruthy();
  });

  it('passes email error to error component on submit', () => {
    //Arrange
    const email = findEl(fixture, '#userEmailId').nativeElement;
    const notifyBtn = findEl(fixture, '.primary_btn').nativeElement;
    //Act
    email.focus();
    fixture.detectChanges();
    email.value = 'abcd';
    fakeDispatchEvent(email, 'input', true, false);
    fixture.detectChanges();
    notifyBtn.click();
    fixture.detectChanges();
    const errors = notifyComponent.controlErrors;
    expect(errorComponent.errors).toEqual(errors);
    expect(errorDirective.appErrorMessage).toBe('email-errors');
    expect(errorDirective.formControlName).toBe('userEmail');
  });
  it('passes required error to error component on submit and email not touched', () => {
    //Arrange
    const notifyBtn = findEl(fixture, '.primary_btn').nativeElement;
    //Act
    notifyBtn.click();
    fixture.detectChanges();
    const errors = notifyComponent.controlErrors;
    expect(errorComponent.errors).toEqual(errors);
    expect(errorDirective.appErrorMessage).toBe('email-errors');
    expect(errorDirective.formControlName).toBe('userEmail');
  });

  it('passes email error to error component on submit and email touched', () => {
    //Arrange
    const email = findEl(fixture, '#userEmailId').nativeElement;
    const notifyBtn = findEl(fixture, '.primary_btn').nativeElement;
    //Act
    email.focus();
    fixture.detectChanges();
    notifyBtn.click();
    fixture.detectChanges();
    const errors = notifyComponent.controlErrors;
    expect(errorComponent.errors).toEqual(errors);
    expect(errorDirective.appErrorMessage).toBe('email-errors');
    expect(errorDirective.formControlName).toBe('userEmail');
  });
});
