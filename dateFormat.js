(function (window, undefined) {
    "use strict";

    // get a list of all tokens on the source that exist on the target,
    // ordered by reverse token length
    var getSortedTokens = function (sourceDefinition, targetDefinition) {
        var tokens = [],
            id = 0;

        for (var key in sourceDefinition) {
            if (!sourceDefinition.hasOwnProperty(key)) {
                continue;
            }

            //skip things that we can't replace
            if (!targetDefinition[key]) {
                continue;
            }

            tokens.push({
                value: sourceDefinition[key],
                key: key,
                id: id++
            });
        }

        tokens.sort(function (lhs, rhs) {
            return rhs.value.length - lhs.value.length;
        });

        return tokens;
    },

    // main dateFormatConverter function
    convert = function (format, from, to) {
        var sourceTokens = getSortedTokens(from, to);

        for (var i = 0; i < sourceTokens.length; i++) {
            format = format.replace(
                new RegExp(sourceTokens[i].value, "g"),
                "{" + sourceTokens[i].id + "}");
        }

        for (var j = 0; j < sourceTokens.length; j++) {
            format = format.replace(
                new RegExp("\\{" + sourceTokens[j].id + "\\}", "g"),
                to[sourceTokens[j].key]);
        }

        return format;
    };

    window.dateFormat = {
        convert: convert
    };
}(window));