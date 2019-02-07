var pinyin = require("tiny-pinyin");
var elementinfo = require("../info/elementinfo");;

var searchelement = function (input) {
    var i = elementinfo.length;
    while (i--) {
        if (elementinfo[i].name == input || elementinfo[i].number == input || elementinfo[i].symbol.toLowerCase() == String(input).toLowerCase() || elementinfo[i].iupac.toLowerCase() == String(input).toLowerCase() || elementinfo[i].pinyin.toLowerCase() == String(input).toLowerCase() || elementinfo[i].pinyin == pinyin.convertToPinyin(String(input)).toLowerCase()) {
            return elementinfo[i];
        }
    }
    return null;
}

module.exports = searchelement;
