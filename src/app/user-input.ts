export class UserInput {
  constructor(
    public mortgageAmount: number,
    public interestRate: number,
    public amortizationPeriodYears: string,
    public amortizationPeriodMonths: string,
    public paymentFrequency: string,
    public term: string,
    public prepaymentAmount: number,
    public prepaymentFrequency: string,
    public startWithPayment: number
  ) {}
}
