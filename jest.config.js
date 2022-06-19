module.exports = {
    "preset": "jest-expo",
    "testPathIgnorePatterns": [
        "<rootDir>/node_modules/",
        "<rootDir>/android/",
        "<rootDir>/ios/",
    ],
    "setupFilesAfterEnv": [
        "@testing-library/jest-native/extend-expect"
    ]
};