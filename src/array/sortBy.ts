import curryN from '../function/curryN';
import { Ord } from '../typings/types';

interface SortBy {
    <T>(fn: (a: T) => Ord, list: ReadonlyArray<T>): T[];
    (fn: (a: any) => Ord): <T>(list: ReadonlyArray<T>) => T[];
}

/**
 * Sorts the array according to the supplied function.
 *
 * @param {Function} fn
 * @param {Array} arr The array to sort.
 * @return {Array} A new array sorted by the keys generated by `fn`.
 * @example
 *
 *      var sortByFirstItem = sortBy(x => x[0]);
 *      var pairs = [[-1, 1], [-2, 2], [-3, 3]];
 *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
 */
export default curryN(2, (fn, arr = []) => {
    const newArray = Array.prototype.slice.call(arr);

    return newArray.sort((a, b) => {
        const x = fn(a);
        const y = fn(b);

        if (x < y) {
            return -1;
        } else if (x > y) {
            return 1;
        }

        return 0;
    });
}) as SortBy;