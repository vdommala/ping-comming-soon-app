import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayErrorComponent } from './display-error.component';
import { findEl } from './../spec-helper';
import { By } from '@angular/platform-browser';

describe('DisplayErrorComponent', () => {
  let component: DisplayErrorComponent;
  let fixture: ComponentFixture<DisplayErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayErrorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('render error message for invalid email', () => {
    //Arrange

    //Act
    component.errors = { email: true };

    fixture.detectChanges();
    //Assert

    const displayElement = findEl(fixture, '.text-error').nativeElement;

    expect(displayElement.textContent.trim()).toEqual(
      component.validationMessages['email']
    );
  });

  it('render error message for required email', () => {
    //Arrange

    //Act
    component.errors = { required: true };

    fixture.detectChanges();
    //Assert

    const displayElement = findEl(fixture, '.text-error').nativeElement;

    expect(displayElement.textContent.trim()).toEqual(
      component.validationMessages['required']
    );
  });

  it('set error message called once', () => {
    //Arrange
    const spy = spyOn(component, 'setErrorMessage');
    //Act
    component.errors = { email: true };

    fixture.detectChanges();
    //Assert

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledOnceWith(component.errors);
  });
});
