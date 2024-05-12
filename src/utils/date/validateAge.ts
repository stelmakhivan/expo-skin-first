import { differenceInYears } from 'date-fns';

const MIN_AGE = 18;

export function validateAge(dateOfBirth: Date) {
  const today = new Date();
  const yearsDiff = differenceInYears(today, dateOfBirth);
  return yearsDiff >= MIN_AGE;
}
