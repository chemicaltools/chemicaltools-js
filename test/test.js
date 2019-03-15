chemicaltools = require('../src/index')

describe('Chemical Tools', function () {

    it("element", function () {
        var result = chemicaltools.searchElement("Hf");
        console.log(JSON.stringify(result));
    });

    it("elementpinyin", function () {
        var result = chemicaltools.searchElement("哈");
        console.log(JSON.stringify(result));
    });

    it("mass", function () {
        var result = chemicaltools.calculateMass("C6H12O6");
        console.log(JSON.stringify(result));
    });

    it("gass", function () {
        var result = chemicaltools.calculateGas(p = 3, V = 1, n = 1);
        console.log(JSON.stringify(result));
    });

    it("acid", function () {
        var result = chemicaltools.calculateAcid(0.1, [2, 7], true);
        console.log(JSON.stringify(result));
    });

    it("deviation", function () {
        var result = chemicaltools.calculateDeviation([2.232, 2.455, 2.742, 2.535, 2.362]);
        console.log(JSON.stringify(result));
    });

    describe('exam', function () {

        it("makequestion", function () {
            var result = chemicaltools.makeQuestion("name", "iupac");
            console.log(JSON.stringify(result));
        });

        it("correctanwser", function () {
            var result = chemicaltools.correctAnswer("铷", "Rubidiutm", "name", "iupac");
            console.log(JSON.stringify(result));
        });
    });
});
