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
  subCalculationAPPayments;
  subCalculationTermPayments;
  mortgagePayment;
  termEndBalance;
  principalPaymentsTerm;
  principalPaymentsAP;
  interestPaymentsTerm;
  interestPaymentsAP;
  totalCostTerm;
  totalCostAP;

  frequencyString;

  APYears;
  termYears;

  onSubmit() {
    this.submitted = true;

    this.numberOfPaymentsTerm = this.model.paymentFrequency * this.model.term;

    this.numberOfPaymentsAP =
      this.model.paymentFrequency * this.model.amortizationPeriodYears;

    this.annualInterestRate =
      this.model.interestRate / 100 / this.model.paymentFrequency;

    this.subCalculationAPPayments = this.calculateSubCalculation(
      this.numberOfPaymentsAP
    );

    this.subCalculationTermPayments = this.calculateSubCalculation(
      this.numberOfPaymentsTerm
    );

    this.mortgagePayment =
      this.model.mortgageAmount *
      ((this.annualInterestRate * this.subCalculationAPPayments) /
        (this.subCalculationAPPayments - 1));

    this.termEndBalance =
      (this.model.mortgageAmount *
        (this.subCalculationAPPayments - this.subCalculationTermPayments)) /
      (this.subCalculationAPPayments - 1);

    this.principalPaymentsTerm =
      this.model.mortgageAmount - this.termEndBalance;

    this.principalPaymentsAP = this.model.mortgageAmount;

    this.totalCostTerm = this.numberOfPaymentsTerm * this.mortgagePayment;

    this.totalCostAP = this.numberOfPaymentsAP * this.mortgagePayment;

    this.interestPaymentsTerm = this.totalCostTerm - this.principalPaymentsTerm;

    this.interestPaymentsAP = this.totalCostAP - this.principalPaymentsAP;

    this.frequencyString = this.paymentFrequencies[this.model.paymentFrequency];

    this.APYears = this.model.amortizationPeriodYears;

    this.termYears = this.model.term;
  }

  // (1 + r/n) ^ numberOfPayments
  calculateSubCalculation(numberOfPayments) {
    return Math.pow(1 + this.annualInterestRate, numberOfPayments);
  }

  constructor() {}

  ngOnInit() {}
}
