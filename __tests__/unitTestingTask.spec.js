const unitTestingTask = require("../unitTestingTask.js");

describe("test unitTestingTask", () => {
  const date = new Date("2022", "05", "22", "02", "18", "20", "20");
  console.log(
    unitTestingTask(
      "YYYY YY MMMM MMM MM M DDD DD D dd d HH H hh h mm m ss s ff f A a ZZ Z",
      date
    )
  );
  it("test if unitTestingTask is function", () => {
    expect(typeof unitTestingTask).toBe("function");
  });

  it("Test YYYY format", () => {
    expect(unitTestingTask("YYYY", date)).toBe("2022");
  });

  it("Test YY format", () => {
    expect(unitTestingTask("YY", date)).toBe("22");
  });

  it("Test MMMM format", () => {
    expect(unitTestingTask("MMMM", date)).toBe("June");
  });

  it("Test MMM format", () => {
    expect(unitTestingTask("MMM", date)).toBe("Jun");
  });

  it("Test MM format", () => {
    expect(unitTestingTask("MM", date)).toBe("06");
  });

  it("Test M format", () => {
    expect(unitTestingTask("M", date)).toBe("6");
  });

  it("Test DDD format", () => {
    expect(unitTestingTask("DDD", date)).toBe("Wednesday");
  });

  it("Test DD format", () => {
    expect(unitTestingTask("DD", date)).toBe("Wed");
  });

  it("Test D format", () => {
    expect(unitTestingTask("D", date)).toBe("We");
  });

  it("Test dd format", () => {
    expect(unitTestingTask("dd", date)).toBe("22");
  });

  it("Test d format", () => {
    expect(unitTestingTask("d", date)).toBe("22");
  });

  it("Test HH format", () => {
    expect(unitTestingTask("HH", date)).toBe("02");
  });

  it("Test H format", () => {
    expect(unitTestingTask("H", date)).toBe("2");
  });

  it("Test hh format", () => {
    expect(unitTestingTask("hh", date)).toBe("02");
  });

  it("Test h format", () => {
    expect(unitTestingTask("h", date)).toBe("2");
  });

  it("Test mm format", () => {
    expect(unitTestingTask("mm", date)).toBe("18");
  });

  it("Test m format", () => {
    expect(unitTestingTask("m", date)).toBe("18");
  });

  it("Test ss format", () => {
    expect(unitTestingTask("ss", date)).toBe("20");
  });

  it("Test s format", () => {
    expect(unitTestingTask("s", date)).toBe("20");
  });

  it("Test ff format", () => {
    expect(unitTestingTask("ff", date)).toBe("020");
  });

  it("Test f format", () => {
    expect(unitTestingTask("f", date)).toBe("20");
  });

  it("Test A format", () => {
    expect(unitTestingTask("A", date)).toBe("AM");
  });

  it("Test a format", () => {
    expect(unitTestingTask("a", date)).toBe("am");
  });

  it("Test ZZ format", () => {
    expect(unitTestingTask("ZZ", date)).toBe("+0200");
  });

  it("Test Z format", () => {
    expect(unitTestingTask("Z", date)).toBe("+02:00");
  });

  it("Test Error of first arg", () => {
    expect(() => unitTestingTask(2, date)).toThrow(
      new Error("Argument `format` must be a string")
    );
  });

  it("Test Error of second arg", () => {
    expect(() => unitTestingTask("dd", null)).toThrow(
      new Error(
        "Argument `date` must be instance of Date or Unix Timestamp or ISODate String"
      )
    );
  });
});
