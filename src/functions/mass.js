var elementinfo = require("../info/elementinfo");

var calasc = function (x) {
    var c = x[0];
    var n = c.charCodeAt();
    if (64 < n < 91)
        return 1;
    else if (96 < n < 123)
        return 2;
    else if (47 < n < 58)
        return 3;
    else if (n == 40 | n == 91 | n == -23640)
        return 4;
    else if (n == 41 | n == 93 | n == -23639)
        return 5;
    return 0;
}
var elementchoose = function (x) {
    for (var i in elementinfo) {
        var info = elementinfo[i];
        if (info.symbol == x) {
            return info.number - 1;
        }
    }
    return -1;
}
var getNumber = function (x, index){
    var num = "";
    while (index < x.length && calasc(x[index]) == 3){
        num += x[index];
        index++;
    }
    return {n: Math.max(parseInt(num), 1), l:num.length}
}

var calculateMass = function (x) {
    var output;
    var l = x.length;
    var s = 0;
    var m = 0;
    var massPer = new Array();
    var atomnumber = new Int8Array(118);
    var mulnumber = new Array();
    var mulif = new Array();
    var mulleft = new Array();
    var mulright = new Array();
    var mulnum = new Array();
    var n, i2, c, y1, y2, y3, y4, T;
    if (l > 0) {
        for (var i = 1; i <= l; i++) {
            i++;
            mulnumber[i] = 1;
            y1 = x[i-1];
            if (calasc(y1) == 4)
                mulif[i] = 1;
            else if (calasc(y1) == 5)
                mulif[i] = -1;
            else
                mulif[i] = 0;
            s += mulif[i];
        }
        if (s == 0) {
            var n = 0;
            for (var i = 1; i < l; i++) {
                if (mulif[i] == 1) {
                    n++;
                    var c = 1;
                    var i2 = i + 1;
                    mulleft[n] = i;
                    while (c > 0) {
                        c += mulif[i2];
                        i2++;
                    }
                    i2--;
                    mulright[n] = i2;
                    mulnum[n] = getNumber(x, i2).n;
                }
            }
            for (var i = 1; i <= n; i++) {
                for (var i2 = mulleft[i]; i2 <= mulright[i]; i2++)
                    mulnumber[i2] *= mulnum[i];
            }
            for (var i = 1; i <= l; i++) {
                y1 = x[i - 1];
                if (calasc(y1) == 1) {
                    if (i >= l)
                        y2 = "1";
                    else
                        y2 = x[i];
                    if (calasc(y2) == 2) {
                        n = elementchoose(y1 + y2);
                        if (n != -1) {
                            num = getNumber(x, i + 1);
                            atomnumber[n] += num.n * mulnumber[i];
                            i += 1+ num.l;
                        }
                    } else if (calasc(y2) == 3) {
                        n = elementchoose(y1);
                        if (n != -1) {
                            num = getNumber(x, i);
                            atomnumber[n] += num.n * mulnumber[i];
                            i += num.l;
                        }
                    } else {
                        n = elementchoose(y1);
                        if (n != -1)
                            atomnumber[n] += mulnumber[i];
                    }
                } else if (calasc(y1) == 5) {
                    if (i >= l)
                        y2 = "a";
                    else
                        y2 = x[i];
                    if (calasc(y2) == 3) {
                        i += getNumber(x, i).l;
                    }
                }
            }
            for (i = 0; i < 118; i++) {
                if (atomnumber[i] > 0) {
                    m += atomnumber[i] * parseFloat(elementinfo[i].mass);
                }
            }
        }
    }
    if (m > 0) {
        var peratom = new Array(0);
        for (i = 0; i < 118; i++) {
            if (atomnumber[i] > 0) {
                massPer[i] = parseFloat(atomnumber[i]) * (parseFloat(elementinfo[i].mass)) / parseFloat(m) * 100;
                peratom.push({
                    name: elementinfo[i].name,
                    iupac: elementinfo[i].iupac,
                    symbol: elementinfo[i].symbol,
                    atomnumber: atomnumber[i],
                    mass: elementinfo[i].mass,
                    massper: massPer[i]
                });
            }
        }
        return {
            name: x,
            mass: m,
            peratom: peratom
        };
    }
    return null;
}
module.exports = calculateMass;
