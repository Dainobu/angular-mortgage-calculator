export class UserInput {
  constructor(
    public mortgageAmount: number,
    public interestRate: number,
    public amortizationPeriodYears: number,
    public amortizationPeriodMonths: number,
    public paymentFrequency: number,
    public term: number,
    public prepaymentAmount: number,
    public startWithPayment: number
  ) {}
}
