function calculateDeviation(input) {
    var sum = 0;
    var t = input.length;
    if (t > 1) {
        var sum = input.reduce((a, b) => a + b, 0);
        var average = sum / t;
        var abssum = 0;
        var squrasum = 0;
        for (var i = 0; i < t; i++) {
            var xabs = Math.abs(parseFloat(input[i]) - average);
            var xsqure = Math.pow(parseFloat(input[i]) - average, 2);
            var abssum = abssum + xabs;
            var squresum = squrasum + xsqure;
        }
        var deviation = abssum / t;
        var deviation_relatibe = deviation / average;
        var s = Math.sqrt(squresum / (t - 1));
        var s_relatibe = s / deviation;
        return {
            input: input,
            average: average,
            average_deviation: deviation,
            relative_average_deviation: deviation_relatibe,
            standard_deviation: s,
            relative_standard_deviation: s_relatibe,
        };
    }
    return null;
}

module.exports = calculateDeviation;