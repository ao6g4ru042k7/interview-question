import { strict as assert } from 'assert';

/** 要組合的對象 */
export interface Item {
  /** 種類，不得重複 */
  type: string;
  /** 數量，需為正整數 */
  amount: number;
}

/**
 * 列出所有組合
 * @param items 要撿的東西
 * @param pick 要挑幾個
 */
function combination<T extends Item = Item>(
  items: Array<T>,
  pick: number,
): Array<Array<T>> {
  const typeList: string[] = [];
  const list: Array<Array<T>> = [];

  for (const item of items) {
    for (let i = 0; i < item.amount; i++) {
      typeList.push(item.type);
    }
  }

  const backtrack = (
    list: Array<Array<T>>,
    childList: string[],
    start: number,
  ) => {
    if (childList.length === pick) {
      const item = [];

      childList.forEach((child) => {
        const lastItem = item[item.length - 1];
        if (lastItem && lastItem.type === child) {
          lastItem.amount++;
        } else {
          item.push({ type: child, amount: 1 });
        }
      });
      list.push(item);
    }

    for (let i = start; i < typeList.length; i++) {
      if (i > start && typeList[i] === typeList[i - 1]) continue;
      childList.push(typeList[i]);
      backtrack(list, childList, i + 1);
      childList.pop();
    }
  };

  backtrack(list, [], 0);
  return list;
}

let result = combination(
  [
    { type: 'Apple', amount: 2 },
    { type: 'Banana', amount: 3 },
    { type: 'Cat', amount: 2 },
    { type: 'Dog', amount: 4 },
    { type: 'Egg', amount: 1 },
  ],
  12,
);
assert(result.length === 1);

result = combination(
  [
    { type: 'Apple', amount: 2 },
    { type: 'Banana', amount: 3 },
    { type: 'Cat', amount: 2 },
    { type: 'Dog', amount: 4 },
    { type: 'Egg', amount: 1 },
  ],
  7,
);
result.forEach((ans) => {
  const sum = ans.reduce((prev, curr) => {
    return prev + curr.amount;
  }, 0);
  assert(sum === 7);
});

result = combination(
  [
    { type: 'Apple', amount: 2 },
    { type: 'Banana', amount: 3 },
    { type: 'Cat', amount: 2 },
    { type: 'Dog', amount: 4 },
    { type: 'Egg', amount: 1 },
  ],
  13,
);
assert(result.length === 0);

result = combination(
  [
    { type: 'Apple', amount: 1 },
    { type: 'Banana', amount: 2 },
    { type: 'Cat', amount: 3 },
  ],
  2,
);
/** A1B1 A1C1 B1C1 B2 C2 */
assert(result.length === 5);
