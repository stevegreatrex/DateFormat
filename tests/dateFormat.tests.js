/*global dateFormat: false, require: false, define: false, module: false, test: false, raises: false, equal: false, ok: false, deepEqual: false*/

(function() {
    "use strict";

    module("dateFormat");

    var checkDotNetToMomentConversion = function (source, expected, unidirectional) {
        var converted = dateFormat.convert(source, dateFormat.dotnet, dateFormat.moment);

        equal(converted, expected);

        if (!unidirectional) {
        	var reconverted = dateFormat.convert(converted, dateFormat.moment, dateFormat.dotnet);
        	equal(reconverted, source, "Should be able to convert back to the original string");
        }
    };

    test("converts from dotnet to moment", function () {
        checkDotNetToMomentConversion("d", "D");
        checkDotNetToMomentConversion("dd", "DD");
        checkDotNetToMomentConversion("ddd", "ddd");
        checkDotNetToMomentConversion("dddd", "dddd");
        checkDotNetToMomentConversion("M", "M");
        checkDotNetToMomentConversion("MM", "MM");
        checkDotNetToMomentConversion("MMM", "MMM");
        checkDotNetToMomentConversion("MMMM", "MMMM");
        checkDotNetToMomentConversion("yy", "YY");
        checkDotNetToMomentConversion("yyy", "YYY");
        checkDotNetToMomentConversion("yyyy", "YYYY");
        checkDotNetToMomentConversion("tt", "A");
        checkDotNetToMomentConversion("t", "a");
        checkDotNetToMomentConversion("H", "H");
        checkDotNetToMomentConversion("HH", "HH");
        checkDotNetToMomentConversion("h", "h");
        checkDotNetToMomentConversion("hh", "hh");
        checkDotNetToMomentConversion("m", "m");
        checkDotNetToMomentConversion("mm", "mm");
        checkDotNetToMomentConversion("s", "s");
        checkDotNetToMomentConversion("ss", "ss");
		//can only test following conversions one-way as multiple elements map onto the same source
        checkDotNetToMomentConversion("F", "S", true);
        checkDotNetToMomentConversion("FF", "SS", true);
        checkDotNetToMomentConversion("FFF", "SSS", true);
        checkDotNetToMomentConversion("FFFF", "SSSS", true);
        checkDotNetToMomentConversion("FFFFF", "SSSSS", true);
        checkDotNetToMomentConversion("FFFFFF", "SSSSSS", true);
        checkDotNetToMomentConversion("FFFFFFF", "SSSSSSS", true);
        checkDotNetToMomentConversion("f", "S", true);
        checkDotNetToMomentConversion("ff", "SS", true);
        checkDotNetToMomentConversion("fff", "SSS", true);
        checkDotNetToMomentConversion("ffff", "SSSS", true);
        checkDotNetToMomentConversion("fffff", "SSSSS", true);
        checkDotNetToMomentConversion("ffffff", "SSSSSS", true);
        checkDotNetToMomentConversion("fffffff", "SSSSSSS", true);
        checkDotNetToMomentConversion("z", "Z");
        checkDotNetToMomentConversion("zz", "ZZ");
        checkDotNetToMomentConversion("zzz", "ZZZ");
        checkDotNetToMomentConversion(
            "d dd ddd dddd M MM MMM MMMM yy yyy yyyy tt t H HH h hh m mm s ss F FF FFF FFFF FFFFF FFFFFF FFFFFFF z zz zzz unknown d",
            "D DD ddd dddd M MM MMM MMMM YY YYY YYYY A a H HH h hh m mm s ss S SS SSS SSSS SSSSS SSSSSS SSSSSSS Z ZZ ZZZ unknown D", true);
    });

    var checkDotNetTojqplotConversion = function (source, expected) {
        var converted = dateFormat.convert(source, dateFormat.dotnet, dateFormat.jqplot);

        equal(converted, expected);

        var reconverted = dateFormat.convert(converted, dateFormat.jqplot, dateFormat.dotnet);
        equal(reconverted, source, "Should be able to convert back to the original string");
    };

    test("converts from dotnet to jqplot", function () {
        var source = "yyyy yyy yy MMMM MMM MM M dddd ddd dd d HH H hh h mm m ss s FFFFFFF FFFFFF FFFFF FFFF FFF FF F fffffff ffffff fffff ffff fff ff f tt t zzz zz z",
            expected = "%Y %Y %y %B %b %m %#m %A %a %d %#d %H %#h %I %#I %M %#M %S %#S %N %N %N %N %N %N %#N %N %N %N %N %N %N %#N %p %p %G %G %G",
            converted = dateFormat.convert(source, dateFormat.dotnet, dateFormat.jqplot);

        equal(converted, expected);
    });

    test("ignores missing definitions", function () {
        var partialFormat = {
            "day-of-month-1": "CONVERTED"
        };

        equal(dateFormat.convert("D MM", dateFormat.moment, partialFormat),
            "CONVERTED MM", "Tokens missing from the target format should be ignored");

        equal(dateFormat.convert("CONVERTED MM", partialFormat, dateFormat.dotnet),
            "d MM", "Tokens missing from the source format should be ignored");
    });

    var checkDotNetTojQueryUIConversion = function (source, expected) {
    	var converted = dateFormat.convert(source, dateFormat.dotnet, dateFormat.jqueryui);

    	equal(converted, expected);

    	var reconverted = dateFormat.convert(converted, dateFormat.jqueryui, dateFormat.dotnet);
    	equal(reconverted, source, "Should be able to convert back to the original string");
    };

    test("converts to dotnet to jqueryui", function () {
    	checkDotNetTojQueryUIConversion("d", "d");
    	checkDotNetTojQueryUIConversion("dd", "dd");
    	checkDotNetTojQueryUIConversion("ddd", "D");
    	checkDotNetTojQueryUIConversion("dddd", "DD");
    	checkDotNetTojQueryUIConversion("M", "m");
    	checkDotNetTojQueryUIConversion("MM", "mm");
    	checkDotNetTojQueryUIConversion("MMM", "M");
    	checkDotNetTojQueryUIConversion("MMMM", "MM");
    	checkDotNetTojQueryUIConversion("yy", "y");
    	checkDotNetTojQueryUIConversion("yyyy", "yy");
    });
}());