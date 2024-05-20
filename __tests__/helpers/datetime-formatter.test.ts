import {
  formatTime,
  formatDate,
  roundOff,
} from '../../src/helpers/datetime-formatter';

describe('formatTime', () => {
  it('formats time correctly', () => {
    const timestamp = 1711454123;
    const timeZone = 'America/New_York';

    const expectedTime = '07:55 AM';

    expect(formatTime(timestamp, timeZone)).toEqual(expectedTime);
  });
});

describe('formatDate', () => {
  it('formats date correctly', () => {
    const timestamp = 1711454123;
    const timeZone = 'America/New_York';

    const expectedDate = 'March 26, 2024 at 07:55 AM';

    expect(formatDate(timestamp, timeZone)).toEqual(expectedDate);
  });
});

describe('roundOff', () => {
  it('rounds off the value correctly', () => {
    const value = 12.3456;

    const expectedRoundedValue = '12';

    expect(roundOff(value)).toEqual(expectedRoundedValue);
  });
});
