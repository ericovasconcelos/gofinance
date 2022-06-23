const expoPreset = require('jest-expo/jest-preset');

module.exports = {
    ...expoPreset,
    preset: "@testing-library/react-native",
    testPathIgnorePatterns: [
        "/node_modules",
        "/android",
        "/ios"
    ],
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|expo-font|sentry-expo|native-base|react-native-svg)"
    ],
    setupFilesAfterEnv: [
        "@testing-library/jest-native/extend-expect",
        "jest-styled-components"
    ],
    verbose: true,
    setupFiles: [
        "./setupFile.js",
        "./node_modules/react-native-gesture-handler/jestSetup.js"
    ]
}