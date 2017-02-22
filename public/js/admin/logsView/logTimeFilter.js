/**
 * Created by מרדכי on 22 פברואר 2017.
 */

app.filter('logTimeView', function () {
    return function (logTime) {
        var splitLogTime = logTime.split('T');
        var date = splitLogTime[0];
        var time = splitLogTime[1].slice(0, -5);
        return time + ' ' + date;
    };
});