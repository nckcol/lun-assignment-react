export const sumMap = (list, fn) =>
  list.reduce((acc, item, index) => acc + fn(item, index), 0);

export const multipleMap = (list, fn) =>
  list.reduce((acc, item, index) => acc * fn(item, index), 1);

export const isPositive = (value) => value > 0;

export const select = (key) => (obj) => obj[key];

export const selectTitle = (item) => item.title;

export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)));

export const pipe = (...fns) => compose.apply(compose, fns.reverse());

export const ring = (fr, to) => (value) => {
  const distance = to - fr;
  return ((value + distance - fr) % distance) + fr;
};
