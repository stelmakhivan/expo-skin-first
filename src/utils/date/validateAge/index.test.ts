import { validateAge } from '.';
import { subYears } from 'date-fns';

describe('validateAge', () => {
  it('returns true for a date of birth 18 years ago', () => {
    const dateOfBirth = subYears(new Date(), 18);
    expect(validateAge(dateOfBirth)).toBe(true);
  });

  it('returns false for a date of birth less than 18 years ago', () => {
    const dateOfBirth = subYears(new Date(), 17);
    expect(validateAge(dateOfBirth)).toBe(false);
  });

  it('returns true for a date of birth more than 18 years ago', () => {
    const dateOfBirth = subYears(new Date(), 19);
    expect(validateAge(dateOfBirth)).toBe(true);
  });
});
