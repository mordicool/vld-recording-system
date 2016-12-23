/**
 * Created by מרדכי on 10 אוגוסט 2016.
 */

function generateRandomNumber() {
    return Math.round(Math.random() * 90000 + 10000);
}

module.exports.generateRandomNumber = generateRandomNumber;