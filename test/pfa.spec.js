const { partialApply, _ } = require("../source/index.js");

describe("partialApply", function() {

    describe("with empty functions", function() {

        it("executes the function when called", function() {
            const fn = sinon.spy();
            const wrapped = partialApply(fn);
            wrapped();
            expect(fn.callCount).to.equal(1);
        });

        it("throws if the function throws", function() {
            const fn = () => {
                throw new Error("custom error");
            };
            const wrapped = partialApply(fn);
            expect(wrapped).to.throw("custom error");
        });

    });

    describe("with partial application", function() {

        it("passes correct parameters", function() {
            const fn = sinon.spy();
            const wrapped = partialApply(fn, _, 2, _);
            wrapped(1, 3);
            expect(fn.callCount).to.equal(1);
            expect(fn.calledWithExactly(1, 2, 3)).to.be.true;
        });

        it("passes undefined if not provided", function() {
            const fn = sinon.spy();
            const wrapped = partialApply(fn, _, 2);
            wrapped();
            expect(fn.calledWithExactly(undefined, 2)).to.be.true;
        });

        it("does not pass extra values", function() {
            const fn = sinon.spy();
            const wrapped = partialApply(fn, _, _, 5);
            wrapped(1, 3, 7);
            expect(fn.calledWithExactly(1, 3, 5)).to.be.true;
        });

    });

});
