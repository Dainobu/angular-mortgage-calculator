import { Component, OnInit } from '@angular/core';
import { UserInput } from '../user-input';
import { Terms } from '../terms.enum';
import { PaymentFrequencies } from '../payment-frequencies.enum';

@Component({
  selector: 'app-mortgage-calculator-form',
  templateUrl: './mortgage-calculator-form.component.html',
  styleUrls: ['./mortgage-calculator-form.component.css'],
})
export class MortgageCalculatorFormComponent implements OnInit {
  // amortizationPeriodYears = [
  //   '',
  //   '1 Year',
  //   '2 Years',
  //   '3 Years',
  //   '4 Years',
  //   '5 Years',
  //   '6 Years',
  //   '7 Years',
  //   '8 Years',
  //   '9 Years',
  //   '10 Years',
  //   '11 Years',
  //   '12 Years',
  //   '13 Years',
  //   '14 Years',
  //   '15 Years',
  //   '16 Years',
  //   '17 Years',
  //   '18 Years',
  //   '19 Years',
  //   '20 Years',
  //   '21 Years',
  //   '22 Years',
  //   '23 Years',
  //   '24 Years',
  //   '25 Years',
  //   '26 Years',
  //   '27 Years',
  //   '28 Years',
  //   '29 Years',
  //   '30 Years',
  // ];

  // amortizationPeriodMonths = [
  //   '',
  //   '1 Month',
  //   '2 Months',
  //   '3 Months',
  //   '4 Months',
  //   '5 Months',
  //   '6 Months',
  //   '7 Months',
  //   '8 Months',
  //   '9 Months',
  //   '10 Months',
  //   '11 Months',
  // ];

  paymentFrequencies = PaymentFrequencies;
  payFreqKeys = Object.keys(PaymentFrequencies).filter(
    (f) => !isNaN(Number(f))
  );

  terms = Terms;
  termKeys = Object.keys(Terms).filter((f) => !isNaN(Number(f)));

  prepaymentFrequencies = ['One time', 'Each year', 'Same as regular payment'];

  model = new UserInput(
    100000.0,
    5.0,
    '25 Years',
    '',
    12,
    5,
    0.0,
    'One time',
    1
  );

  submitted = false;

  numberOfPayments;
  annualInterestRate;
  subCalculation;
  mortgagePayment;

  onSubmit() {
    this.submitted = true;

    this.numberOfPayments = this.model.paymentFrequency * this.model.term;

    this.annualInterestRate =
      this.model.interestRate / 100 / this.model.paymentFrequency;

    this.subCalculation = Math.pow(
      1 + this.annualInterestRate,
      this.numberOfPayments
    );

    this.mortgagePayment =
      this.model.mortgageAmount *
      ((this.annualInterestRate * this.subCalculation) /
        (this.subCalculation - 1));
  }

  constructor() {}

  ngOnInit() {}
}
