/*global dateFormat: false, require: false, define: false, module: false, test: false, raises: false, equal: false, ok: false, deepEqual: false*/

(function() {
    "use strict";

    module("dateFormat");

    var checkDotNetToMomentConversion = function (source, expected) {
        var converted = dateFormat.convert(source, dateFormat.dotnet, dateFormat.moment);

        equal(converted, expected);

        var reconverted = dateFormat.convert(source, dateFormat.moment, dateFormat.dotnet);
        equal(reconverted, source, "Should be able to convert back to the original string");
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
        checkDotNetToMomentConversion("F", "S");
        checkDotNetToMomentConversion("FF", "SS");
        checkDotNetToMomentConversion("FFF", "SSS");
        checkDotNetToMomentConversion("FFFF", "SSSS");
        checkDotNetToMomentConversion("FFFFF", "SSSSS");
        checkDotNetToMomentConversion("FFFFFF", "SSSSSS");
        checkDotNetToMomentConversion("FFFFFFF", "SSSSSSS");
        checkDotNetToMomentConversion("f", "S");
        checkDotNetToMomentConversion("ff", "SS");
        checkDotNetToMomentConversion("fff", "SSS");
        checkDotNetToMomentConversion("ffff", "SSSS");
        checkDotNetToMomentConversion("fffff", "SSSSS");
        checkDotNetToMomentConversion("ffffff", "SSSSSS");
        checkDotNetToMomentConversion("fffffff", "SSSSSSS");
        checkDotNetToMomentConversion("z", "Z");
        checkDotNetToMomentConversion("zz", "ZZ");
        checkDotNetToMomentConversion("zzz", "ZZZ");
        checkDotNetToMomentConversion(
            "d dd ddd dddd M MM MMM MMMM yy yyy yyyy tt t H HH h hh m mm s ss F FF FFF FFFF FFFFF FFFFFF FFFFFFF z zz zzz unknown d",
            "D DD ddd dddd M MM MMM MMMM YY YYY YYYY A a H HH h hh m mm s ss S SS SSS SSSS SSSSS SSSSSS SSSSSSS Z ZZ ZZZ unknown D");
    });

    var checkDotNetTojqplotConversion = function (source, expected) {
        var converted = dateFormat.convert(source, dateFormat.dotnet, dateFormat.jqplot);

        equal(converted, expected);

        var reconverted = dateFormat.convert(source, dateFormat.jqplot, dateFormat.dotnet);
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
}());