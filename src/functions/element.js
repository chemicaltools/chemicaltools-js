var pinyin = require("tiny-pinyin");
var elementinfo = require("../info/elementinfo");;

var searchelement = function (input) {
    input = String(input).toLowerCase()
    try {
        var inputpinyin = pinyin.convertToPinyin(input).toLowerCase()
    } catch (e) {
        var inputpinyin = ''
    }
    for (var i in elementinfo) {
        var info = elementinfo[i];
        if (info.name == input || info.number == input || info.symbol.toLowerCase() == input || info.iupac.toLowerCase() == input || info.pinyin.toLowerCase() == input || info.pinyin == inputpinyin) {
            return info;
        }
    }
    return null;
}

module.exports = searchelement;
