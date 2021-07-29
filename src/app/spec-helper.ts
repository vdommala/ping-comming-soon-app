import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function findEl<Type>(
  fixture: ComponentFixture<Type>,
  selector: string
): DebugElement {
  return fixture.debugElement.query(By.css(`${selector}`));
}

export function fakeDispatchEvent(
  element: HTMLElement,
  eventType: string,
  bubbles: boolean,
  cancelable: boolean
) {
  const event = document.createEvent('Event');
  event.initEvent(eventType, bubbles, cancelable);
  element.dispatchEvent(event);
}

export function makeClick(
  element: DebugElement | HTMLElement,
  eventName: string,
  eventObject: any
) {
  if (element instanceof DebugElement) {
    return element.triggerEventHandler(`${eventName}`, eventObject);
  } else {
    element.click();
  }
}

export function textContent(element: HTMLElement): string | null {
  return element.textContent;
}

export function getAttribute(
  element: HTMLElement,
  attribute: string
): string | null  {
  return element.getAttribute(attribute);
  
}
