const timezonedDate = require("timezoned-date");

const originalDate = Date;

function setupMockDate() {
    function reset() {
        Date = originalDate;
    }

    function set({ isoDate, offset }) {
        const getMockDate = () => {
            let MockDate;
            jest.isolateModules(() => {
                MockDate = require("mockdate");
            });

            return MockDate;
        };

        Date = timezonedDate.makeConstructor(offset);

        getMockDate().set(isoDate);
    }

    return { reset, set };
}

exports.setupMockDate = setupMockDate;
