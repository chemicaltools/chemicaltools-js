var elementinfo = require("../info/elementinfo");

var calasc = function (x) {
    var c = x.substr(0, 1);
    var n = c.charCodeAt();
    if (n > 64 & n < 91)
        return 1;
    else if (n > 96 & n < 123)
        return 2;
    else if (n > 47 & n < 58)
        return 3;
    else if (n == 40 | n == 91 | n == -23640)
        return 4;
    else if (n == 41 | n == 93 | n == -23639)
        return 5;
    return 0;
}
var elementchoose = function (x) {
    var result = -1;
    elementinfo.some(function (info) {
        if (info.symbol == x) {
            result = info.number - 1;
            return
        }
    });
    return result;
}
var calculateMass = function (x) {
    var output;
    var l = x.length;
    var i = 0;
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
        while (i < l) {
            i++;
            mulnumber[i] = 1;
            y1 = x.substr(i - 1, 1);
            if (calasc(y1) == 4)
                mulif[i] = 1;
            else if (calasc(y1) == 5)
                mulif[i] = -1;
            else
                mulif[i] = 0;
            s += mulif[i];
        }
        if (s == 0) {
            i = 1;
            var n = 0;
            while (i < l) {
                if (mulif[i] == 1) {
                    n++;
                    var c = 1;
                    var i2 = i + 1;
                    mulleft[n] = i;
                    while (c > 0) {
                        c = c + mulif[i2];
                        i2++;
                    }
                    i2--;
                    mulright[n] = i2;
                    if (i2 + 1 > l)
                        y3 = "a";
                    else
                        y3 = x.substr(i2, 1);
                    if (calasc(y3) == 3) {
                        if (i2 + 2 > l)
                            y4 = "a";
                        else
                            y4 = x.substr(i2 + 1, 1);
                        if (calasc(y4) == 3)
                            mulnum[n] = parseInt(y3 + y4);
                        else
                            mulnum[n] = parseInt(y3);
                    } else {
                        mulnum[n] = 1;
                    }
                }
                i++;
            }
            i = 0;
            while (i < n) {
                i++;
                for (var i2 = mulleft[i]; i2 <= mulright[i]; i2++)
                    mulnumber[i2] *= mulnum[i];
            }
            i = 0;
            while (i < l) {
                i++;
                y1 = x.substr(i - 1, 1);
                if (calasc(y1) == 1) {
                    if (i >= l)
                        y2 = "1";
                    else
                        y2 = x.substr(i, 1);
                    if (calasc(y2) == 2) {
                        T = y1 + y2;
                        n = elementchoose(T);
                        if (n != -1) {
                            if (i + 1 >= l)
                                y3 = "1";
                            else
                                y3 = x.substr(i + 1, 1);
                            if (calasc(y3) == 3) {
                                if (i + 2 >= l)
                                    y4 = "a";
                                else
                                    y4 = x.substr(i + 2, 1);
                                if (calasc(y4) == 3) {
                                    atomnumber[n] = atomnumber[n] + parseInt(y3 + y4) * mulnumber[i];
                                    i += 3;
                                } else {
                                    atomnumber[n] = atomnumber[n] + parseInt(y3) * mulnumber[i]
                                    i += 2;
                                }
                            } else {
                                atomnumber[n] += mulnumber[i];
                                i++;
                            }
                        }
                    } else if (calasc(y2) == 3) {
                        n = elementchoose(y1);
                        if (n != -1) {
                            if (i + 1 >= l)
                                y3 = "a";
                            else
                                y3 = x.substr(i + 1, 1);
                            if (calasc(y3) == 3) {
                                atomnumber[n] += parseInt(y2 + y3) * mulnumber[i];
                                i += 2;
                            } else {
                                atomnumber[n] += parseInt(y2) * mulnumber[i];
                            }
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
                        y2 = x.substr(i, 1);
                    if (calasc(y2) == 3) {
                        if (i + 1 >= l)
                            y2 = "a";
                        else
                            y3 = x.substr(i + 1, 1);
                        if (calasc(y3) == 3) i++;
                        i++;
                    }
                }
            }
            for (i = 0; i < 118; i++) {
                if (atomnumber[i] > 0) {
                    m = m + atomnumber[i] * parseFloat(elementinfo[i].mass);
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