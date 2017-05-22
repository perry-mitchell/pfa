const ARGUMENT_PLACEHOLDER = { _: "__PARTIAL_APPLICATION_ARGUMENT__" };

/**
 * Partially apply arguments to a function
 * Wraps a function so that some arguments are applied beforehand, and others on
 * a later call. The `this` value is also passed to the internal function.
 * @param {Function} func The function to partially apply arguments
 * @param {...*} originalArgs Arguments to wrap. All arguments that are not `_`
 *  will be passed in order to the wrapped function. Arguments provided as `_`
 *  are expected to be provided in order later.
 * @returns {Function} A wrapped function that returns whatever the wrapped
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

partialApply._ = ARGUMENT_PLACEHOLDER;
partialApply.partialApply = partialApply;

module.exports = partialApply;
