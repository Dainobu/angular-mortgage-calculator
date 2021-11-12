import { Component, OnInit } from '@angular/core';
import { UserInput } from '../user-input';
import { Terms } from '../terms.enum';
import { PaymentFrequencies } from '../payment-frequencies.enum';
import { AmortizationPeriodYears } from '../amortization-period-years.enum';

@Component({
  selector: 'app-mortgage-calculator-form',
  templateUrl: './mortgage-calculator-form.component.html',
  styleUrls: ['./mortgage-calculator-form.component.css'],
})
export class MortgageCalculatorFormComponent implements OnInit {
  amortizationPeriodYears = AmortizationPeriodYears;
  amortYearKeys = this.getKeys(this.amortizationPeriodYears);

  paymentFrequencies = PaymentFrequencies;
  payFreqKeys = this.getKeys(this.paymentFrequencies);

  terms = Terms;
  termOptions = this.getKeys(this.terms);

  model = new UserInput(100000.0, 5.0, 25, 0, 12, 5, 0.0, 1);

  submitted = false;

  numberOfPaymentsTerm;
  numberOfPaymentsAP;
  frequencyInterestRate;
  subCalculationAAPPayments;
  subCalculationB;
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

  getKeys(enumName) {
    return Object.keys(enumName).filter((f) => !isNaN(Number(f)));
  }

  updateTermOptions() {
    this.termOptions = Object.keys(Terms).filter(
      (f) =>
        !isNaN(Number(f)) && Number(f) <= this.model.amortizationPeriodYears
    );

    if (this.model.amortizationPeriodYears < this.model.term) {
      this.model.term = null;
    }
  }

  onSubmit() {
    this.submitted = true;
    this.calculateResult();
  }

  calculateResult() {
    this.numberOfPaymentsTerm = this.calculateNumberOfPayments(
      this.model.paymentFrequency,
      this.model.term
    );

    this.numberOfPaymentsAP = this.calculateNumberOfPayments(
      this.model.paymentFrequency,
      this.model.amortizationPeriodYears
    );

    this.frequencyInterestRate = this.calculateFrequencyInterestRate(
      this.model.interestRate,
      this.model.paymentFrequency
    );

    this.subCalculationAAPPayments = this.calculateSubCalculationA(
      this.frequencyInterestRate,
      this.numberOfPaymentsAP
    );

    this.subCalculationB = this.calculateSubCalculationB(
      this.subCalculationAAPPayments
    );

    this.mortgagePayment = this.calculateMortgagePayment(
      this.model.mortgageAmount,
      this.frequencyInterestRate,
      this.subCalculationAAPPayments,
      this.subCalculationB
    );

    this.termEndBalance = this.calculateEndTermBalance(
      this.model.mortgageAmount,
      this.subCalculationAAPPayments,
      this.frequencyInterestRate,
      this.numberOfPaymentsTerm,
      this.subCalculationB
    );

    this.principalPaymentsTerm = this.calculatePrincipalPayment(
      this.model.mortgageAmount,
      this.termEndBalance
    );

    this.principalPaymentsAP = this.calculatePrincipalPayment(
      this.model.mortgageAmount,
      0
    );

    this.totalCostTerm = this.calculateTotalCost(
      this.numberOfPaymentsTerm,
      this.mortgagePayment
    );

    this.totalCostAP = this.calculateTotalCost(
      this.numberOfPaymentsAP,
      this.mortgagePayment
    );

    this.interestPaymentsTerm = this.calculateInterestPayment(
      this.totalCostTerm,
      this.principalPaymentsTerm
    );

    this.interestPaymentsAP = this.calculateInterestPayment(
      this.totalCostAP,
      this.principalPaymentsAP
    );

    this.frequencyString = this.getInputtedPaymentFrequencyKey();

    this.APYears = this.getInputtedAmortizationPeriod();

    this.termYears = this.getInputtedTerm();
  }

  calculateNumberOfPayments(paymentFrequency, numberOfYears) {
    return paymentFrequency * numberOfYears;
  }

  calculateFrequencyInterestRate(interestRatePercentValue, paymentFrequency) {
    return interestRatePercentValue / 100 / paymentFrequency;
  }

  // (1 + r/n) ^ numberOfPayments
  calculateSubCalculationA(frequencyInterestRate, numberOfPayments) {
    return Math.pow(1 + frequencyInterestRate, numberOfPayments);
  }

  // subCalculationA (with amortization period numberOfPayments) - 1
  calculateSubCalculationB(subCalculationAAP) {
    return subCalculationAAP - 1;
  }

  // Fixed Periodic Payment = P *[(r/n) * (1 + r/n)^(n*t)] / [(1 + r/n)^(n*t) – 1]
  calculateMortgagePayment(
    mortgageAmount,
    annualInterestRate,
    subCalculationAAPPayments,
    subCalculationB
  ) {
    return (
      mortgageAmount *
      ((annualInterestRate * subCalculationAAPPayments) / subCalculationB)
    );
  }

  // Outstanding Loan Balance = P * [(1 + r/n)^(n*t) – (1 + r/n)^(n*m)] / [(1 + r/n)^(n*t) – 1]
  calculateEndTermBalance(
    mortgageAmount,
    subCalculationAAPPayments,
    frequencyInterestRate,
    numberOfPaymentsTerm,
    subCalculationB
  ) {
    let subCalculationATermPayments = this.calculateSubCalculationA(
      frequencyInterestRate,
      numberOfPaymentsTerm
    );

    return (
      (mortgageAmount *
        (subCalculationAAPPayments - subCalculationATermPayments)) /
      subCalculationB
    );
  }

  calculatePrincipalPayment(mortgageAmount, endBalance) {
    return mortgageAmount - endBalance;
  }

  calculateTotalCost(numberOfPayments, mortgagePayment) {
    return numberOfPayments * mortgagePayment;
  }

  calculateInterestPayment(totalCost, principalPayment) {
    return totalCost - principalPayment;
  }

  getInputtedPaymentFrequencyKey() {
    return this.paymentFrequencies[this.model.paymentFrequency];
  }

  getInputtedAmortizationPeriod() {
    return this.model.amortizationPeriodYears;
  }

  getInputtedTerm() {
    return this.model.term;
  }

  constructor() {}

  ngOnInit() {}
}
