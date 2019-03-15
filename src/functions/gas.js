const R = 8.314;

var getgas = function (p = null, V = null, n = null, T = null) {
    if (!p) {
        p = n * R * T / V;
    } else if (!V) {
        V = n * R * T / p;
    } else if (!n) {
        n = p * V / R / T;
    } else if (!T) {
        T = p * V / n / R;
    } else {
        return null;
    }
    return { p: p, V: V, n: n, T: T };
}
module.exports = getgas;