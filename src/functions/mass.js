var elementinfomodule = require("../info/elementinfo");
var search = elementinfomodule.search;
var elementinfo = elementinfomodule.elementinfo;
var calasc = function(x) {
  var n = x[0].charCodeAt();
  if (n > 64 && n < 91) return 1;
  else if (n > 96 && n < 123) return 2;
  else if (n > 47 && n < 58) return 3;
  else if ((n == 40) | (n == 91) | (n == -23640)) return 4;
  else if ((n == 41) | (n == 93) | (n == -23639)) return 5;
  return 0;
};
var elementchoose = function(x) {
  var info = search("symbol", x);
  return (info ? info.number : 0) - 1;
};
var getNumber = function(x, index) {
  var num = "";
  while (index < x.length && calasc(x[index]) == 3) {
    num += x[index];
    index++;
  }
  return { n: parseInt(num) || 1, l: num.length };
};

var calculateMass = function(x) {
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
  if (l > 0) {
    for (var i = 0; i < l; i++) {
      mulnumber[i] = 1;
      y1 = x[i];
      if (calasc(y1) == 4) mulif[i] = 1;
      else if (calasc(y1) == 5) mulif[i] = -1;
      else mulif[i] = 0;
      s += mulif[i];
    }
    if (s == 0) {
      var nn = 0;
      for (var i = 0; i < l; i++) {
        if (mulif[i] == 1) {
          var c = 1;
          var i2 = i + 1;
          mulleft[nn] = i;
          while (c > 0) {
            c += mulif[i2];
            i2++;
          }
          mulright[nn] = i2;
          mulnum[nn] = getNumber(x, i2).n;
          nn++;
        }
      }
      for (var i = 0; i < nn; i++) {
        for (var i2 = mulleft[i]; i2 < mulright[i]; i2++)
          mulnumber[i2] *= mulnum[i];
      }
      for (var i = 0; i < l; i++) {
        var y1 = x[i];
        if (calasc(y1) == 1) {
          var y2 = x[i + 1] || "1";
          var i2 = i;
          if (calasc(y2) == 2) {
            y1 += y2;
            i++;
          }
          var n = elementchoose(y1);
          if (n != -1) {
            num = getNumber(x, i + 1);
            atomnumber[n] += num.n * mulnumber[i2];
            i += num.l;
          }
        } else if (calasc(y1) == 5) {
          i += getNumber(x, i + 1).l;
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
        massPer[i] =
          ((parseFloat(atomnumber[i]) * parseFloat(elementinfo[i].mass)) /
            parseFloat(m)) *
          100;
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
};
module.exports = calculateMass;
