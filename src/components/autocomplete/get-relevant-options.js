import {sumMap, multipleMap, select, compose, isPositive} from './helpers';

const wordMatchFactor = (word, query) => {
  if (word.indexOf(query) !== 0) {
    return 0;
  }

  return query.length / word.length;
};

const calculateMatchFactor = (query) => (text) => {
  const spaces = /\s/;

  const queryParts = query.toLowerCase().split(spaces);
  const wordList = text.toLowerCase().split(spaces);

  const lastQuery = queryParts.pop();

  const fullQueryFactor = multipleMap(queryParts, (queryItem) =>
    sumMap(wordList, (wordItem, index) => {
      if (wordItem !== queryItem) return 0;
      return 1 / (index + 1);
    })
  );

  const lastQueryFactor = sumMap(
    wordList,
    (wordItem, index) => wordMatchFactor(wordItem, lastQuery) / (index + 1)
  );

  if (lastQuery.length) {
    return fullQueryFactor * lastQueryFactor;
  }

  return fullQueryFactor;
};

const createCompare = (selector) => (operation) => (a, b) =>
  operation(selector(a), selector(b));

const getRelevantOptions = (options, query) => {
  const calculateMatchFactorByString = calculateMatchFactor(query);
  const selectValue = select('value');
  const selectMatchFactor = select('matchFactor');
  const compareMatchFactor = createCompare(selectMatchFactor)((a, b) => b - a);

  const optionsWithMatchFactor = options.map((item) => ({
    ...item,
    matchFactor: compose(
      calculateMatchFactorByString,
      selectValue
    )(item)
  }));

  return optionsWithMatchFactor
    .filter(
      compose(
        isPositive,
        selectMatchFactor
      )
    )
    .sort(compareMatchFactor);
};

export default getRelevantOptions;
