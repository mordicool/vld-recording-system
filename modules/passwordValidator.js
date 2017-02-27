/**
 * Created by מרדכי on 27 פברואר 2017.
 */

const specialCharacters = /^((?![\\/:?\"<>\|`~!@#%&$^*\(\)\{\}\[\]\-_+=;'.,]).)*$/i; // Doesn't contain any special characters
const capitalLetters = /^((?![A-Z]).)*$/i; // Doesn't contain any capital characters

function validate(password) {
    return !(password.length < 8 || specialCharacters.test(password) || capitalLetters.test(password));
}

module.exports = validate;