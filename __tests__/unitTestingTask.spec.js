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
const isoDatePM = "2022-06-22T22:18:20.020Z";

describe("test unitTestingTask", () => {
    it.each`
        format    | isoDate      | expected
        ${"YYYY"} | ${isoDate}   | ${"2022"}
        ${"YY"}   | ${isoDate}   | ${"22"}
        ${"MMMM"} | ${isoDate}   | ${"June"}
        ${"MMM"}  | ${isoDate}   | ${"Jun"}
        ${"MM"}   | ${isoDate}   | ${"06"}
        ${"M"}    | ${isoDate}   | ${"6"}
        ${"DDD"}  | ${isoDate}   | ${"Wednesday"}
        ${"DD"}   | ${isoDate}   | ${"Wed"}
        ${"D"}    | ${isoDate}   | ${"We"}
        ${"dd"}   | ${isoDate}   | ${"22"}
        ${"d"}    | ${isoDate}   | ${"22"}
        ${"HH"}   | ${isoDate}   | ${"02"}
        ${"H"}    | ${isoDate}   | ${"2"}
        ${"hh"}   | ${isoDate}   | ${"02"}
        ${"h"}    | ${isoDate}   | ${"2"}
        ${"mm"}   | ${isoDate}   | ${"18"}
        ${"m"}    | ${isoDate}   | ${"18"}
        ${"ss"}   | ${isoDate}   | ${"20"}
        ${"s"}    | ${isoDate}   | ${"20"}
        ${"ff"}   | ${isoDate}   | ${"020"}
        ${"f"}    | ${isoDate}   | ${"20"}
        ${"A"}    | ${isoDate}   | ${"AM"}
        ${"a"}    | ${isoDate}   | ${"am"}
        ${"A"}    | ${isoDatePM} | ${"PM"}
        ${"a"}    | ${isoDatePM} | ${"pm"}
        ${"ZZ"}   | ${isoDate}   | ${"+0000"}
    `("Test $format format for $isoDate", ({ format, isoDate, expected }) => {
        mockDate.set({ offset, isoDate });
        const date = new Date();
        expect(unitTestingTask(format, date)).toBe(expected);
    });

    it.each`
        format             | expected
        ${"ISODate"}       | ${"2022-06-22"}
        ${"ISOTime"}       | ${"02:18:20"}
        ${"ISODateTime"}   | ${"2022-06-22T02:18:20"}
        ${"ISODateTimeTZ"} | ${"2022-06-22T02:18:20+00:00"}
    `("Test fromater: $format", ({ format, expected }) => {
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

    it("Test pass of ms", () => {
        jest.useFakeTimers();
        mockDate.set({ offset, isoDate });
        let date = new Date();
        jest.setSystemTime(date);

        expect(unitTestingTask("f", date)).toBe("20");

        setTimeout(() => {}, 150);
        jest.runAllTimers();

        expect(unitTestingTask("f", jest.now())).toBe("170");
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
