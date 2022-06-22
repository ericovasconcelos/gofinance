const expoPreset = require('jest-expo/jest-preset');

module.exports = {
    ...expoPreset,
    preset: "@testing-library/react-native",
    testPathIgnorePatterns: [
        "/node_modules",
        "/android",
        "/ios"
    ],
    setupFilesAfterEnv: [
        "@testing-library/jest-native/extend-expect",
        "jest-styled-components"
    ],
    automock: false,
    resetMocks: false,
    setupFiles: ["./setupFile.js"]
}