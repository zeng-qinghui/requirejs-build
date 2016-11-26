/**
 * Created by zengohm on 16-11-26.
 */

var _ = require('lodash');
var child_process = require('child_process');

module.exports = {
    build: function (options, callback) {
        var cmd_options = this.array_to_cmd(this.options_to_array(options));
        var cmd = "node ./node_modules/requirejs/bin/r.js -o " + cmd_options;
        if (callback && typeof(callback) == 'function') {
            child_process.exec(cmd, callback);
        } else {
            child_process.exec(cmd);
        }

    },
    options_to_array: function (options, context) {
        if (!context) {
            context = [];
        }
        var output = {};
        for (var k in options) {
            if (typeof(options[k]) == 'object') {
                output = _.merge(output, this.options_to_array(options[k], _.concat(context, k)));
            } else {
                output[_.concat(context, k).join('.')] = options[k];
            }
        }
        return output;
    },
    array_to_cmd: function (a) {
        var output = [];
        for (var i in a) {
            output.push(i + '=' + a[i]);
        }
        return output.join(' ');
    }
};
