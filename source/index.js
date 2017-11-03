const ARGUMENT_PLACEHOLDER = { _: "__PARTIAL_APPLICATION_ARGUMENT__" };

/**
 * Partially apply arguments to a function
 * Wraps a function so that some arguments are applied beforehand, and others on
 * a later call. The `this` value is also passed to the internal function.
 * @param {Function} func The function to partially apply arguments
 * @param {...*} originalArgs Arguments to wrap. All arguments that are not `_`
 *  will be passed in order to the wrapped function. Arguments provided as `_`
 *  are expected to be provided in order later.
 * @returns {Function} A wrapped function that returns whatever the nested
 *  function returns
 * @example
 *      // Simple adding function
 *      function add(a, b) {
 *          return a + b;
 *      }
 *      // Wrap
 *      const addOne = partialApply(1, _);
 *      // Call later
 *      addOne(5); // 6
 */
function partialApply(func, ...originalArgs) {
    return function __partiallyAppliedFunction() {
        const currentArgs = [...arguments];
        const finalArgs = originalArgs.map(function __prepareArg(originalArg) {
            return originalArg === ARGUMENT_PLACEHOLDER ?
                currentArgs.shift() :
                originalArg;
        });
        return func.call(this, ...finalArgs);
    };
}

/**
 * Partially apply arguments to the right-side of a function
 * @param {Function} func The function to partially apply arguments to
 * @param {...*} originalArgs The arguments to pass to the right side of the function
 * @returns {Function} A wrapped function that returns whatever the nested
 *  function returns
 * @example
 *      // Function with a callback
 *      function doSomething(arg1, arg2, callback) {
 *          callback(arg1 + arg2);
 *      }
 *      // Wrap
 *      const logSomething = partialApplyRight(doSomething, console.log);
 *      // Call later
 *      logSomething(1, 2); // console.log's "3"
 */
function partialApplyRight(func, ...originalArgs) {
    const illegalPlaceholder = originalArgs.find(arg => arg === ARGUMENT_PLACEHOLDER);
    if (illegalPlaceholder) {
        throw new Error("Unable to partially apply arguments: placeholders not allowed in right-application");
    }
    return function __partiallyAppliedFunction() {
        const args = [...arguments, ...originalArgs];
        return func.call(this, ...args);
    };
}

partialApply._ = ARGUMENT_PLACEHOLDER;
partialApply.partialApply = partialApply;
partialApply.partialApplyRight = partialApplyRight;

module.exports = partialApply;
