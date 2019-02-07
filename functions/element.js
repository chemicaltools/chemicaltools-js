var pinyin = require("tiny-pinyin");
var elementinfo = require("../info/elementinfo");;

var searchelement = function (input) {
    var result;
    input = String(input).toLowerCase()
    try {
        var inputpinyin = pinyin.convertToPinyin(input).toLowerCase()
    } catch (e) {
        var inputpinyin = ''
    }
    elementinfo.some(function (info) {
        if (info.name == input || info.number == input || info.symbol.toLowerCase() == input || info.iupac.toLowerCase() == input || info.pinyin.toLowerCase() == input || info.pinyin == inputpinyin) {
            result = info;
            return;
        }
    });
    return result;
}

module.exports = searchelement;
