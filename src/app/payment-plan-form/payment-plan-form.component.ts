import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-plan-form',
  templateUrl: './payment-plan-form.component.html',
  styleUrls: ['./payment-plan-form.component.css'],
})
export class PaymentPlanFormComponent implements OnInit {
  paymentFrequency = [
    'Accelerated Weekly',
    'Weekly',
    'Accelerated Bi-weekly',
    'Bi-Weekly (every 2 weeks)',
    'Semi-monthly (24x per year)',
    'Monthly (12x per year)',
  ];

  constructor() {}

  ngOnInit() {}
}
