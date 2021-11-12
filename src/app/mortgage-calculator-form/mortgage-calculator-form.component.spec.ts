import { CurrencyPipe } from '@angular/common';
import { Terms } from '../terms.enum';
import { MortgageCalculatorFormComponent } from './mortgage-calculator-form.component';

describe('Testing form functions', () => {
  var form;
  //This will be called before running each spec
  beforeEach(function () {
    form = new MortgageCalculatorFormComponent();
  });

  describe('Testing getKeys function', () => {
    it('should give term enum keys', () =>
      expect(form.getKeys(Terms)).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
      ]));
  });
  describe('Testing calculateMortgagePayment function', () => {
    it('should calculate fixed periodic payment', () =>
      expect(
        +form
          .calculateMortgagePayment(100000, 0.004167, 1.28336, 0.28336)
          .toFixed(2)
      ).toEqual(1887.27));
  });
});
