import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PaymentPlanFormComponent } from './payment-plan-form/payment-plan-form.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, PaymentPlanFormComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
