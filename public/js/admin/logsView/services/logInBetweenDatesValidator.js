/**
 * Created by מרדכי on 23 פברואר 2017.
 */

app.service('logInBetweenDatesValidator', function () {

    this.validate = function (logDate, startDate, endDate) {
        var date = new Date(logDate);
        var endRealDate = new Date(endDate);
        endRealDate.setDate(endRealDate.getDate() + 1);
        return (date >= startDate && date <= endRealDate);
    }

});