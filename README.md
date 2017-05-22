# pfa
Crazy-simple Partial Function Application library

[![Build Status](https://travis-ci.org/perry-mitchell/pfa.svg?branch=master)](https://travis-ci.org/perry-mitchell/pfa) [![npm version](https://badge.fury.io/js/pfa.svg)](https://www.npmjs.com/package/pfa)

## About
Partial function application is way cool! Imagine having a function that you use in multiple places, but its parameters are often repeated due to the configuration not changing. You could wrap the function yourself, or you could use a library like **pfa** to partially apply arguments to the function.

For instance, the npm library [clone](https://www.npmjs.com/package/clone) takes 3 parameters: `clone(obj, isCircular, depth)` - imagine that we always use the same values for the latter 2 arguments:

```javascript
const result = clone(myObj, false, 50);
```

It'd be much nicer to just call `clone(myObj)`, so we could in turn do something like the following:

```javascript
const { partialApply, _ } = require("pfa");
const _clone = require("clone");

const clone = partialApply(
    _clone,     // The function to partially apply arguments
    _,          // An argument we will provide later
    false,      // An argument to always provide at the second position
    50          // An argument to always provide at the third position
);

const myObj = { key: "value" };
const clonedObj = clone(myObj); // equiv: clone(myObj, false, 50);
```

## Usage
**pfa** exports 2 items:

 * `partialApply`: The partial application function
 * `_`: Placeholder for unknown arguments

It also exports the `partialApply` function as the default, so CommonJS and ES6 imports can both be used neatly:

```javascript
const { partialApply, _ } = require("pfa");
```

_Or:_

```javascript
import partialApply, { _ } from "pfa";
```

**pfa** supports NodeJS 6.10 onwards. For browser usage you should transpile to ES5 using something like BabelJS.

## Installation
Simply install as a dependency:

```shell
npm install pfa --save
```
