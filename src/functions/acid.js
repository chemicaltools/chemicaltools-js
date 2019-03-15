var calpH = function (pKa, c, pKw) {
    var Ka1 = Math.pow(10, -pKa[0]);
    var Kw = Math.pow(10, -pKw);
    var cH = (Math.sqrt(Ka1 * Ka1 + 4 * Ka1 * c + Kw) - Ka1) * 0.5;
    if (cH > 0) return -Math.log(cH) / Math.LN10;
    else return 1024;
};
var calpHtoc = function (pKa, c, pH) {
    var D = 0;
    var E = 1;
    var G = new Array();
    var Ka = new Array();
    var pHtoc = new Array();
    var H = Math.pow(10, -pH);
    var F = Math.pow(H, pKa.length + 1);
    for (var i = 0; i < pKa.length; i++) {
        Ka[i] = Math.pow(10, -pKa[i]);
    }
    for (var i = 0; i < pKa.length + 1; i++) {
        G[i] = F * E;
        D = D + G[i];
        F = F / H;
        E = E * Ka[i];
    }
    for (var i = 0; i < pKa.length + 1; i++) {
        pHtoc[i] = c * G[i] / D;
    }
    return pHtoc;
};

var ionname = function (AorB, len, i) {
    var name = '';
    if (AorB) {
        if (i < len - 1) {
            name += "H";
            if (len - i > 2) name += (len - i - 1);
        }
        name += 'A';
        if (i > 0) {
            if (i > 1) name += i;
            name += "-";
        }
    } else {
        name += 'B';
        if (len - i > 2) {
            name += "(OH)" + (len - i - 1);
        } else if (len - i == 2) {
            name += "OH";
        }
        if (i > 0) {
            if (i > 1) name += i;
            name += '+';
        }
    }
    return name;
}
var calacid = function (c, pKa, AorB, pKw = 14) {
    const liquidpKa = -1.74;
    for (var i = 0; i < pKa.length; i++) {
        if (pKa[i] < liquidpKa) pKa[i] = liquidpKa;
    }
    var pH = calpH(pKa, c, pKw);
    var cAB = calpHtoc(pKa, c, pH);
    if (!AorB) pH = pKw - pH;
    var H = Math.pow(10, -pH);
    var ion = [{ name: cAB ? 'H+' : 'OH-', c: H }];

    for (var i = 0; i < cAB.length; i++) {
        ion.push({
            name: ionname(AorB, cAB.length, i),
            c: cAB[i]
        });
    }
    return {
        c: c,
        pH: pH,
        ion: ion
    };
}
module.exports = calacid;