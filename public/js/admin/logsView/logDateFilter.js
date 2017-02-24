/**
 * Created by מרדכי on 22 פברואר 2017.
 */

app.filter('logTimeView', function () {
    return function (logTime) {
        return new Date(logTime).toLocaleString();
    };
});