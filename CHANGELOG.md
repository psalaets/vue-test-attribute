# Change Log

All notable changes to this project will be documented in this file.

## [1.2.0] - 2017-11-30
### Added

- Accept settings during directive install
- `production` setting that defaults based on `process.env.NODE_ENV`
- When directive value is `false` attribute is not added to element. If already there it will be removed from element.

### Fixed

- Metadata mistake that left out the es6 module version

## [1.1.0] - 2017-11-25
### Added

- When `process.env.NODE_ENV` is `production`, do nothing

## [1.0.1] - 2017-11-25
### Fixed

- Bad build

## [1.0.0] - 2017-11-25
### Added

- Initial impl