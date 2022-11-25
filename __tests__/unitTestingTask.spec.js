const unitTestingTask = require("../unitTestingTask.js");
const setupMockDate = require("../test-utils");

let mockDate;
beforeEach(() => {
    mockDate = setupMockDate.setupMockDate();
});

afterEach(() => {
    mockDate.reset();
});

const offset = 0;

const isoDate = "2022-06-22T02:18:20.020Z";
const isoDate22 = "2022-06-22T22:18:20.020Z";

const testingObject = [
    {
        format: "YYYY",
        expected: "2022",
        isoDate,
    },
    {
        format: "YY",
        expected: "22",
        isoDate,
    },
    {
        format: "MMMM",
        expected: "June",
        isoDate,
    },
    {
        format: "MMM",
        expected: "Jun",
        isoDate,
    },
    {
        format: "MM",
        expected: "06",
        isoDate,
    },
    {
        format: "M",
        expected: "6",
        isoDate,
    },
    {
        format: "DDD",
        expected: "Wednesday",
        isoDate,
    },
    {
        format: "DD",
        expected: "Wed",
        isoDate,
    },
    {
        format: "D",
        expected: "We",
        isoDate,
    },
    {
        format: "dd",
        expected: "22",
        isoDate,
    },
    {
        format: "d",
        expected: "22",
        isoDate,
    },
    {
        format: "HH",
        expected: "02",
        isoDate,
    },
    {
        format: "H",
        expected: "2",
        isoDate,
    },
    {
        format: "hh",
        expected: "02",
        isoDate,
    },
    {
        format: "h",
        expected: "2",
        isoDate,
    },
    {
        format: "mm",
        expected: "18",
        isoDate,
    },
    {
        format: "m",
        expected: "18",
        isoDate,
    },
    {
        format: "ss",
        expected: "20",
        isoDate,
    },
    {
        format: "s",
        expected: "20",
        isoDate,
    },
    {
        format: "ff",
        expected: "020",
        isoDate,
    },
    {
        format: "f",
        expected: "20",
        isoDate,
    },
    {
        format: "A",
        expected: "AM",
        isoDate,
    },
    {
        format: "a",
        expected: "am",
        isoDate,
    },
    {
        format: "A",
        expected: "PM",
        isoDate: isoDate22,
    },
    {
        format: "a",
        expected: "pm",
        isoDate: isoDate22,
    },
    {
        format: "ZZ",
        expected: "+0000",
        isoDate,
    },
];

const formaters = [
    {
        format: "ISODate",
        expected: "2022-06-22",
    },
    {
        format: "ISOTime",
        expected: "02:18:20",
    },
    {
        format: "ISODateTime",
        expected: "2022-06-22T02:18:20",
    },
    {
        format: "ISODateTimeTZ",
        expected: "2022-06-22T02:18:20+00:00",
    },
];

describe("test unitTestingTask", () => {
    test.each(testingObject)(
        "Test $format format for $isoDate",
        ({ format, isoDate, expected }) => {
            mockDate.set({ offset, isoDate });
            const date = new Date();
            expect(unitTestingTask(format, date)).toBe(expected);
        }
    );

    test.each(formaters)("Test fromater: $format", ({ format, expected }) => {
        mockDate.set({ offset, isoDate });
        const date = new Date();
        expect(unitTestingTask(unitTestingTask._formatters[format](date))).toBe(
            expected
        );
    });

    it("Test Error of first arg", () => {
        mockDate.set({ offset, isoDate });
        const date = new Date();
        expect(() => unitTestingTask(2, date)).toThrow(
            new Error("Argument `format` must be a string")
        );
    });

    it("Test Error of second arg", () => {
        mockDate.set({ offset, isoDate });
        const date = new Date();
        expect(() => unitTestingTask("dd", null)).toThrow(
            new Error(
                "Argument `date` must be instance of Date or Unix Timestamp or ISODate String"
            )
        );
    });

    it("Test if lang function with en", () => {
        expect(unitTestingTask.lang("en")).toBe("en");
    });
});
