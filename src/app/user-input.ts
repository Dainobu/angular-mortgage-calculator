export class UserInput {
  constructor(
    public mortgageAmount: number,
    public interestRate: number,
    public amortizationPeriodYears: string,
    public amortizationPeriodMonths: string,
    public paymentFrequency: number,
    public term: number,
    public prepaymentAmount: number,
    public prepaymentFrequency: string,
    public startWithPayment: number
  ) {}
}
