/**
 * Created by zengohm on 16-11-25.
 */

var fs = require('fs');
var _ = require('lodash');
var glob = require('glob');

var dir = {
    processPatterns : function(patterns, fn) {
        // Filepaths to return.
        var result = [];
        // Iterate over flattened patterns array.
        _.flattenDeep(patterns).forEach(function(pattern) {
            // If the first character is ! it should be omitted
            var exclusion = pattern.indexOf('!') === 0;
            // If the pattern is an exclusion, remove the !
            if (exclusion) { pattern = pattern.slice(1); }
            // Find all matching files for this pattern.
            var matches = fn(pattern);
            if (exclusion) {
                // If an exclusion, remove matching files.
                result = _.difference(result, matches);
            } else {
                // Otherwise add matching files.
                result = _.union(result, matches);
            }
        });
        return result;
    },
    expand : function() {
        var args = _.toArray(arguments);
        // If the first argument is an options object, save those options to pass
        // into the file.glob.sync method.
        var options = typeof(args[0]) === 'object' ? args.shift() : {};
        // Use the first argument if it's an Array, otherwise convert the arguments
        // object to an array and use that.
        var patterns = Array.isArray(args[0]) ? args[0] : args;
        // Return empty set if there are no patterns or filepaths.
        if (patterns.length === 0) { return []; }
        // Return all matching filepaths.
        var matches = this.processPatterns(patterns, function(pattern) {
            // Find all matching files for this pattern.
            return glob.sync(pattern, options);
        });
        // Filter result set?
        if (options.filter) {
            matches = matches.filter(function(filepath) {
                filepath = path.join(options.cwd || '', filepath);
                try {
                    if (typeof options.filter === 'function') {
                        return options.filter(filepath);
                    } else {
                        // If the file is of the right type and exists, this should work.
                        return fs.statSync(filepath)[options.filter]();
                    }
                } catch (e) {
                    // Otherwise, it's probably not the right type.
                    return false;
                }
            });
        }
        return matches;
    }
};

module.exports = dir;