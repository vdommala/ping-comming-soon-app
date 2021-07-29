import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorMessageDirective } from './error-message.directive';
import { fakeDispatchEvent, findEl, getAttribute } from './spec-helper';
@Component({
  template: `
    <div [formGroup]="form">
      <input
        formControlName="email"
        appErrorMessage="error"
        placeholder="holdertext"
      />
    </div>
  `,
})
class MockFormComponent implements OnInit {
  form!: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
}
describe('ErrorMessageDirective', () => {
  let mockFixture: ComponentFixture<MockFormComponent>;
  let mockComponent: MockFormComponent;
  let errorDirective: ErrorMessageDirective;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ErrorMessageDirective, MockFormComponent],
      imports: [ReactiveFormsModule],
      providers: [ControlContainer],
    }).compileComponents;
  });

  beforeEach(() => {
    mockFixture = TestBed.createComponent(MockFormComponent);
    mockComponent = mockFixture.componentInstance;
    mockFixture.detectChanges();
    errorDirective = findEl(mockFixture, 'input').injector.get(
      ErrorMessageDirective
    );
  });

  it('should create an instance', () => {
    expect(errorDirective).toBeInstanceOf(ErrorMessageDirective);
  });

  it('default state ', () => {
    //Arrange
    expect(errorDirective.formControlName).toBe('email');
    expect(errorDirective.appErrorMessage).toBe('error');
  });
  it('untouched input has aria invalid false', () => {
    //Arrange
    const emailInput = findEl(mockFixture, 'input').nativeElement;
    // Act
    mockComponent.form.controls.email.markAsUntouched();
    mockFixture.detectChanges();
    //Assert
    expect(getAttribute(emailInput, `aria-invalid`)).toBe('false');
  });

  it('input touched with no value has aria invalid true', () => {
    //Arrange
    const emailInput = findEl(mockFixture, 'input').nativeElement;
    // Act
    fakeDispatchEvent(emailInput, 'focus', true, false);
    fakeDispatchEvent(emailInput, 'blur', false, false);
    mockFixture.detectChanges();
    //Assert
    expect(getAttribute(emailInput, `aria-invalid`)).toBe('true');
  });

  it('input touched with no value has aria errormessage error', () => {
    //Arrange
    const emailInput = findEl(mockFixture, 'input').nativeElement;
    // Act
    fakeDispatchEvent(emailInput, 'focus', true, false);
    fakeDispatchEvent(emailInput, 'blur', false, false);
    mockFixture.detectChanges();
    //Assert
    expect(getAttribute(emailInput, `aria-errormessage`)).toBe('error');
  });

  it('invalid email sets the placeholder text', () => {
    //Arrange
    const emailInput = findEl(mockFixture, 'input').nativeElement;
    //Act
    emailInput.value = 'agrt';
    fakeDispatchEvent(emailInput, 'input', true, false);
    fakeDispatchEvent(emailInput, 'blur', false, false);
    mockFixture.detectChanges();
    //Assert
    expect(getAttribute(emailInput, `aria-invalid`)).toBe('true');
    expect(getAttribute(emailInput, `aria-errormessage`)).toBe('error');
    expect(getAttribute(emailInput, `placeholder`)).toBe('name@host.tld');
  });
});
