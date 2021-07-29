import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotifyMeComponent } from './notify-me/notify-me.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageDirective } from './error-message.directive';
import { DisplayErrorComponent } from './display-error/display-error.component';
@NgModule({
  declarations: [
    AppComponent,
    NotifyMeComponent,
    ErrorMessageDirective,
    DisplayErrorComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
