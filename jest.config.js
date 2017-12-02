module.exports = {
  "transform": {
    // process js with babel-jest
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
  },
  "mapCoverage": true,
  "snapshotSerializers": [
    "<rootDir>/node_modules/jest-serializer-vue"
  ]
};