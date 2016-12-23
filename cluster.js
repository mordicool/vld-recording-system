/**
 * Created by מרדכי on 29 נובמבר 2016.
 */

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

cluster.on('exit', function (worker, code, signal) {
    console.log('Worker %d died with code/signal %s. Restarting worker...', worker.process.pid, signal || code);
    cluster.fork();
});

if (cluster.isMaster) {
    for (var i=0; i<numCPUs; i++) {
        cluster.fork();
    }
} else {
    require('./app').execute();
}