exports.searchElement = require("./functions/element");
exports.calculateMass = require("./functions/mass");
exports.calculateGas = require("./functions/gas");
exports.calculateAcid = require("./functions/acid");
exports.calculateDeviation = require("./functions/deviation");

var exam = require("./functions/exam");
exports.makeQuestion = exam.makequestion;
exports.correctAnswer = exam.correctanswer;
exports.elementinfo = require("./info/elementinfo").elementinfo;
