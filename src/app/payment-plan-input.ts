export class PaymentPlanInput {
  constructor(
    public mortgageAmount: number,
    public interestRate: number,
    public amortizationPeriodYears: string,
    public amortizationPeriodMonths: string,
    public paymentFrequency: string,
    public term: string
  ) {}
}
