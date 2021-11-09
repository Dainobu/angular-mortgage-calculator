export class PrepaymentPlanInput {
  constructor(
    public prepaymentAmount: number,
    public prepaymentFrequency: string,
    public startWithPayment: number
  ) {}
}
