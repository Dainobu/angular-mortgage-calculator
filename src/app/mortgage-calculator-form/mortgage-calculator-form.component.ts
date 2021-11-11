import { Component, OnInit } from '@angular/core';
import { UserInput } from '../user-input';
import { Terms } from '../terms.enum';
import { PaymentFrequencies } from '../payment-frequencies.enum';
import { AmortizationPeriodMonths } from '../amortization-period-months.enum';
import { AmortizationPeriodYears } from '../amortization-period-years.enum';

@Component({
  selector: 'app-mortgage-calculator-form',
  templateUrl: './mortgage-calculator-form.component.html',
  styleUrls: ['./mortgage-calculator-form.component.css'],
})
export class MortgageCalculatorFormComponent implements OnInit {
  amortizationPeriodYears = AmortizationPeriodYears;
  amortYearKeys = Object.keys(AmortizationPeriodYears).filter(
    (f) => !isNaN(Number(f)) && f != ''
  );

  // amortizationPeriodMonths = AmortizationPeriodMonths;
  // amortMonthKeys = Object.keys(AmortizationPeriodMonths).filter(
  //   (f) => !isNaN(Number(f)) && f != ''
  // );

  paymentFrequencies = PaymentFrequencies;
  payFreqKeys = Object.keys(PaymentFrequencies).filter(
    (f) => !isNaN(Number(f))
  );

  terms = Terms;
  termKeys = Object.keys(Terms).filter((f) => !isNaN(Number(f)));

  prepaymentFrequencies = ['One time', 'Each year', 'Same as regular payment'];

  model = new UserInput(100000.0, 5.0, 25, 0, 12, 5, 0.0, 'One time', 1);

  submitted = false;

  numberOfPaymentsTerm;
  numberOfPaymentsAP;
  annualInterestRate;
  subCalculation;
  mortgagePayment;
  principalPaymentsTerm;
  principalPaymentsAP;

  totalCostTerm;
  totalCostAP;

  onSubmit() {
    this.submitted = true;

    this.numberOfPaymentsTerm = this.model.paymentFrequency * this.model.term;

    this.numberOfPaymentsAP =
      this.model.paymentFrequency * this.model.amortizationPeriodYears;

    this.annualInterestRate =
      this.model.interestRate / 100 / this.model.paymentFrequency;

    this.subCalculation = Math.pow(
      1 + this.annualInterestRate,
      this.numberOfPaymentsAP
    );

    this.mortgagePayment =
      this.model.mortgageAmount *
      ((this.annualInterestRate * this.subCalculation) /
        (this.subCalculation - 1));

    this.principalPaymentsAP = this.model.mortgageAmount;

    this.totalCostTerm = this.numberOfPaymentsTerm * this.mortgagePayment;

    this.totalCostAP = this.numberOfPaymentsAP * this.mortgagePayment;
  }

  constructor() {}

  ngOnInit() {}
}
