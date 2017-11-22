# API

## Table of Contents

- [Collection](#collection)
  - [`flatMapNested()`](#flatmapnested)
  - [`hasMembers()`](#hasmembers)
  - [`insertAt()`](#insertat)
  - [`partitionAt()`](#partitionat)
- [Function](#function)
  - [`guardUndefined()`](#guardundefined)
  - [`tapUnless()`](#tapunless)
- [Lang](#lang)
  - [`isDefined()`](#isdefined)
  - [`isPresent()`](#ispresent)
- [Object](#object)
  - [`hasAll()`](#hasall)
  - [`renameKeys()`](#renamekeys)
- [Util](#util)
  - [`condv()`](#condv)

## Collection

### `flatMapNested()`

> `flatMapNested(iterators: Array<string | string[] | Function>, collection: any[]): any[]`

Iteratively runs `lodash/fp/flatMap` on the collection for each iterator.

```js
const collection = [
  { a: [{ b: [{ c: [0] }] }] },
  { a: [{ b: [{ c: [1] }, { c: [2] }] }] },
  { a: [{ b: [{ c: [3] }] }] },
];

flatMapNested(['a', 'b', 'c'], collection); // [0, 1, 2, 3]
```

### `hasMembers()`

> `hasMembers(any[]): boolean`

Predicate that tests whether the collection has at least one member.

```js
hasMembers([0, 1]); // true

hasMembers([]); // false
```

### `insertAt()`

> `insertAt(index: number, value: any, collection any[]): any[]`

Inserts the value at the index in the collection.

```js
const collection = ['a', 'b', 'c'];

insertAt(1, 'z', collection); // ['a', 'z', 'b', 'c']
insertAt(-1, 'z', collection); // ['z', 'a', 'b', 'c']
insertAt(5, 'z', collection); // ['a', 'b', 'c', 'z']
```

### `partitionAt()`

> `partitionAt(index: number, collection: any[]): [any[], any[]]`

Partitions a collection at the index.

```js
const collection = ['a', 'b', 'c'];

partitionAt(2, collection); // [['a', 'b'], ['c']]
partitionAt(-1, collection); // [[], ['a', 'b', 'c']]
partitionAt(4, collection); // [['a', 'b', 'c'], []]
```

## Function

### `guardUndefined()`

> `guardUndefined(f: Function, args: any[]): any`

Prevents the function from being invoked if any of the args are `undefined`.

```js
const multiply = (x, y) => x * y;

guardUndefined(multiply, [2, undefined]); // undefined
guardUndefined(multiply, [2, 3]); // 6
```

### `tapUnless()`

> `tapUnless(predicate: any, f: Function, value: any): any`

Returns the value unless the predicate passes, in which case is invokes function with the value and returns the result.

```js
const addOne = n => n + 1;

tapUnless(true, addOne, 1); // 2
tapUnless(() => true, addOne, 1); // 2
tapUnless(false, addOne, 1); // undefined
tapUnless(() => false, addOne, 1); // undefined
```

## Lang

### `isDefined()`

> `isDefined(value: any): boolean`

Predicate that tests whether a value is not `undefined`.

```js
isDefined(undefined); // false

isDefined(null); // true
isDefined(false); // true
isDefined(0); // true
isDefined(-0); // true
isDefined(NaN); // true
isDefined(''); // true
isDefined(""); // true
```

### `isPresent()`

> `isPresent(value: any): boolean`

Predicate that tests whether a value is neither `null`, nor `undefined`.

```js
isPresent(undefined); // false
isPresent(null); // false

isPresent(false); // true
isPresent(0); // true
isPresent(-0); // true
isPresent(NaN); // true
isPresent(''); // true
isPresent(""); // true
```

## Object

### `hasAll()`

> `hasAll(paths: Array<string | string[]>, obj: Object): boolean`

Predicate that tests whether the object has all of the paths.

```js
const obj = { a: 1, b: 2, c: 3 };

hasAll(['a', 'b', 'c'], obj); // true
hasAll(['a', 'b', 'z'], obj); // false
```

### `renameKeys()`

> `renameKeys(pairs: [string, string], obj: Object): Object

Renames the keys of an object according to the key-pairs (`[prevKey, nextKey]`).

```js
const obj = { a: 1, b: 2, c: 3 };

renameKeys([['a', 'aa'], ['b', 'bb']], obj); // { aa: 1, bb: 2, c: 3 }
```

## Util

## `condv()`

> `condv(pairs: [any, any]): Function`

Like `lodash/fp/cond` except that the pairs may contain values as well.

```js
condv([[0, 'A'], [1, 'B'], [2, 'C']])(1); // 'B'
```
