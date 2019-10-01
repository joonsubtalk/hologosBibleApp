import wholeNumberify from './wholeNumberify';

test('wholeNumberify 1/2 to equal .5', () => {
  expect(wholeNumberify(1, 2)).toBe(0.5);
});

test('wholeNumberify 1/1 to equal 1', () => {
  expect(wholeNumberify(1, 1)).toBe(1);
});

test('wholeNumberify 2/0 to equal 2', () => {
  expect(wholeNumberify(2, 0)).toBe(2);
});

test('wholeNumberify 2/0 to equal 2', () => {
  expect(wholeNumberify(2, 1)).toBe(2);
});

test('wholeNumberify 7/3 to equal 2.33', () => {
  expect(wholeNumberify(7, 3)).toBe(2.33);
});
