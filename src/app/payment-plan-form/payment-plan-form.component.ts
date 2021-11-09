import { Component, OnInit } from '@angular/core';
import { PaymentPlanInput } from '../payment-plan-input';

@Component({
  selector: 'app-payment-plan-form',
  templateUrl: './payment-plan-form.component.html',
  styleUrls: ['./payment-plan-form.component.css'],
})
export class PaymentPlanFormComponent implements OnInit {
  amortizationPeriodYears = [
    '',
    '1 Year',
    '2 Years',
    '3 Years',
    '4 Years',
    '5 Years',
    '6 Years',
    '7 Years',
    '8 Years',
    '9 Years',
    '10 Years',
    '11 Years',
    '12 Years',
    '13 Years',
    '14 Years',
    '15 Years',
    '16 Years',
    '17 Years',
    '18 Years',
    '19 Years',
    '20 Years',
    '21 Years',
    '22 Years',
    '23 Years',
    '24 Years',
    '25 Years',
    '26 Years',
    '27 Years',
    '28 Years',
    '29 Years',
    '30 Years',
  ];

  amortizationPeriodMonths = [
    '',
    '1 Month',
    '2 Months',
    '3 Months',
    '4 Months',
    '5 Months',
    '6 Months',
    '7 Months',
    '8 Months',
    '9 Months',
    '10 Months',
    '11 Months',
  ];

  paymentFrequencies = [
    'Accelerated Weekly',
    'Weekly',
    'Accelerated Bi-weekly',
    'Bi-Weekly (every 2 weeks)',
    'Semi-monthly (24x per year)',
    'Monthly (12x per year)',
  ];

  terms = [
    '1 Year',
    '2 Years',
    '3 Years',
    '4 Years',
    '5 Years',
    '6 Years',
    '7 Years',
    '8 Years',
    '9 Years',
    '10 Years',
  ];

  model = new PaymentPlanInput(
    100000.0,
    5.0,
    '25 Years',
    '',
    'Monthly (12x per year)',
    '5 Years'
  );

  constructor() {}

  ngOnInit() {}
}
