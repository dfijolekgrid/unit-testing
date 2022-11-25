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
    },
    {
        format: "YY",
        expected: "22",
    },
    {
        format: "MMMM",
        expected: "June",
    },
    {
        format: "MMM",
        expected: "Jun",
    },
    {
        format: "MM",
        expected: "06",
    },
    {
        format: "M",
        expected: "6",
    },
    {
        format: "DDD",
        expected: "Wednesday",
    },
    {
        format: "DD",
        expected: "Wed",
    },
    {
        format: "D",
        expected: "We",
    },
    {
        format: "dd",
        expected: "22",
    },
    {
        format: "d",
        expected: "22",
    },
    {
        format: "HH",
        expected: "02",
    },
    {
        format: "H",
        expected: "2",
    },
    {
        format: "hh",
        expected: "02",
    },
    {
        format: "h",
        expected: "2",
    },
    {
        format: "mm",
        expected: "18",
    },
    {
        format: "m",
        expected: "18",
    },
    {
        format: "ss",
        expected: "20",
    },
    {
        format: "s",
        expected: "20",
    },
    {
        format: "ff",
        expected: "020",
    },
    {
        format: "f",
        expected: "20",
    },
    {
        format: "A",
        expected: "AM",
    },
    {
        format: "a",
        expected: "am",
    },
    {
        format: "ZZ",
        expected: "+0000",
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
    test.each(testingObject)("Test $format format", ({ format, expected }) => {
        mockDate.set({ offset, isoDate });
        const date = new Date();
        expect(unitTestingTask(format, date)).toBe(expected);
    });

    test.each(formaters)("Test fromater: $format", ({ format, expected }) => {
        mockDate.set({ offset, isoDate });
        const date = new Date();
        expect(unitTestingTask(unitTestingTask._formatters[format](date))).toBe(
            expected
        );
    });

    it("Test format A for hour > 11", () => {
        mockDate.set({ offset, isoDate: isoDate22 });
        const date = new Date();
        expect(unitTestingTask("A", date)).toBe("PM");
    });

    it("Test format a for hour > 11", () => {
        mockDate.set({ offset, isoDate: isoDate22 });
        const date = new Date();
        expect(unitTestingTask("a", date)).toBe("pm");
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
