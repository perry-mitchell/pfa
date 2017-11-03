## Functions

<dl>
<dt><a href="#partialApply">partialApply(func, ...originalArgs)</a> ⇒ <code>function</code></dt>
<dd><p>Partially apply arguments to a function
Wraps a function so that some arguments are applied beforehand, and others on
a later call. The <code>this</code> value is also passed to the internal function.</p>
</dd>
<dt><a href="#partialApplyRight">partialApplyRight(func, ...originalArgs)</a> ⇒ <code>function</code></dt>
<dd><p>Partially apply arguments to the right-side of a function</p>
</dd>
</dl>

<a name="partialApply"></a>

## partialApply(func, ...originalArgs) ⇒ <code>function</code>
Partially apply arguments to a function
Wraps a function so that some arguments are applied beforehand, and others on
a later call. The `this` value is also passed to the internal function.

**Kind**: global function  
**Returns**: <code>function</code> - A wrapped function that returns whatever the nested
 function returns  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | The function to partially apply arguments |
| ...originalArgs | <code>\*</code> | Arguments to wrap. All arguments that are not `_`  will be passed in order to the wrapped function. Arguments provided as `_`  are expected to be provided in order later. |

**Example**  
```js
// Simple adding function
     function add(a, b) {
         return a + b;
     }
     // Wrap
     const addOne = partialApply(1, _);
     // Call later
     addOne(5); // 6
```
<a name="partialApplyRight"></a>

## partialApplyRight(func, ...originalArgs) ⇒ <code>function</code>
Partially apply arguments to the right-side of a function

**Kind**: global function  
**Returns**: <code>function</code> - A wrapped function that returns whatever the nested
 function returns  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | The function to partially apply arguments to |
| ...originalArgs | <code>\*</code> | The arguments to pass to the right side of the function |

**Example**  
```js
// Function with a callback
     function doSomething(arg1, arg2, callback) {
         callback(arg1 + arg2);
     }
     // Wrap
     const logSomething = partialApplyRight(doSomething, console.log);
     // Call later
     logSomething(1, 2); // console.log's "3"
```
