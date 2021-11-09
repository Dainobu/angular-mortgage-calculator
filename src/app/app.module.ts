import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MortgageCalculatorFormComponent } from './mortgage-calculator-form/mortgage-calculator-form.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, MortgageCalculatorFormComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
