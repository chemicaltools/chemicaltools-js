var elementinfo = require("../info/elementinfo");

var searchforkind = function (kind, x) {
    var i = elementinfo.length
    while (i--) {
        if (elementinfo[i][kind] == x) {
            return i
        }
    }
    return null
}
var correctanswer = function (question, answer, questiontype = "name", answertype = "iupac") {
    var correct_answer
    var i = searchforkind(questiontype, question)
    var correct_answer = elementinfo[i][answertype]
    return {
        correct: correct_answer == answer,
        question: question,
        correct_answer: correct_answer,
        answer: answer
    }
}
var makequestion = function (questiontype = "name", answertype = "iupac", max = 86) {
    var numbers = Array.from(Array(max).keys()).sort(() => Math.random() - 0.5).slice(0, 4)
    var question = elementinfo[numbers[0]][questiontype]
    numbers.sort()
    var options = new Array(4)
    for (var i2 = 0; i2 < 4; i2++) {
        options[i2] = (elementinfo[numbers[i2]][answertype])
    }
    return { question: question, options: options }
}
exports.makequestion = makequestion
exports.correctanswer = correctanswer