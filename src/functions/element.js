var pinyin = require("tiny-pinyin");
var elementinfomodule = require("../info/elementinfo");
var search = elementinfomodule.search;
var searchelement = function(input) {
  try {
    var inputpinyin = pinyin.convertToPinyin(input).toLowerCase();
  } catch (e) {
    var inputpinyin = "";
  }
  return (
    search("name", input) ||
    search("number", input) ||
    search("symbol", input) ||
    search("iupac", input) ||
    search("pinyin", input) ||
    search("pinyin", inputpinyin)
  );
};

module.exports = searchelement;
