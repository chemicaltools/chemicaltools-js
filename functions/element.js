var pinyin = require("tiny-pinyin");
var elementinfo = require("../info/elementinfo");;

var searchelement = function (input) {
    var i = elementinfo.length;
    input = String(input).toLowerCase()
    try{
        var inputpinyin=pinyin.convertToPinyin(input).toLowerCase()
    }catch(e){
        var inputpinyin=''
    }
    while (i--) {
        if (elementinfo[i].name == input || elementinfo[i].number == input || elementinfo[i].symbol.toLowerCase() == input || elementinfo[i].iupac.toLowerCase() == input || elementinfo[i].pinyin.toLowerCase() == input || elementinfo[i].pinyin == inputpinyin) {
            return elementinfo[i];
        }
    }
    return null;
}

module.exports = searchelement;
