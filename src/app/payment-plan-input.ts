export class PaymentPlanInput {
  constructor(
    public mortgageAmount: number,
    public interestRate: number,
    public amortizationPeriodYears: number,
    public amortizationPeriodMonths: number,
    public paymentFrequency: string,
    public term: number
  ) {}
}
