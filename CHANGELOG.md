# Changelog

## [3.0.0](https://github.com/Coobaha/typed-fastify/compare/v2.0.0...v3.0.0) (2023-10-31)


### ⚠ BREAKING CHANGES

* Better support for json-like input and outputs in the schema
* additionalProperties false by default ([#88](https://github.com/Coobaha/typed-fastify/issues/88))
* jsonify req.body
* bump fastify and fix types
* bump to fastify4
* empty response type should now be typed as never instead of void
* start correctly aliasing refs
* bumping minor version as 0.1.x were published
* make response schema be a map of statuses instead of contents

### Features

* add AsRouteObj to Service interface ([f03cb41](https://github.com/Coobaha/typed-fastify/commit/f03cb415042b75e43403430fd09f61ba96a821e4))
* add request.routeOptions support ([#82](https://github.com/Coobaha/typed-fastify/issues/82)) ([1a49a6c](https://github.com/Coobaha/typed-fastify/commit/1a49a6cdf02e1afb4dff037286eecdd9b24257ad))
* add typed params inferred from route path ([613ef14](https://github.com/Coobaha/typed-fastify/commit/613ef143f0a741be9456057c1a70877678184d2f))
* allow jsonified variants in response ([e15f273](https://github.com/Coobaha/typed-fastify/commit/e15f27313361b333cc3dad517ded4168d7e36bf0))
* Better support for json-like input and outputs in the schema ([f27e6f8](https://github.com/Coobaha/typed-fastify/commit/f27e6f8e4ebe9a71ce04f9e91c36337b306824a1))
* bump deps and expose logger and schema compiler generics from Fastify ([80d209d](https://github.com/Coobaha/typed-fastify/commit/80d209dda1721ee4492a5eff5a05ac07fe76c7e6))
* bump fastify / ts types and better type preHandler ([#61](https://github.com/Coobaha/typed-fastify/issues/61)) ([d7c8dce](https://github.com/Coobaha/typed-fastify/commit/d7c8dce5003f5b1d05819c819060b440c86a6613))
* start correctly aliasing refs ([6e3362d](https://github.com/Coobaha/typed-fastify/commit/6e3362db34819869f2a61aef4ebbad803f77b6f1))
* treat redirect as reply ([519e6ca](https://github.com/Coobaha/typed-fastify/commit/519e6cad45ba780c78f6c0938f75b032b6bf2da1))


### Bug Fixes

* $ref id replacement ([482cbd4](https://github.com/Coobaha/typed-fastify/commit/482cbd4c412f43df015ccb4b9bec09f0e15514eb))
* additionalProperties false by default ([#88](https://github.com/Coobaha/typed-fastify/issues/88)) ([442fabb](https://github.com/Coobaha/typed-fastify/commit/442fabb9c7fd216f188c7dfb1f79f2e04f697b0c))
* bump 📸 ([2aa0ce6](https://github.com/Coobaha/typed-fastify/commit/2aa0ce641cf6fffa1d418715abf4c100f4965698))
* bump all deps ([4c6aca7](https://github.com/Coobaha/typed-fastify/commit/4c6aca7e0c0edcfc25b2e567005a45c0ed98d2b0))
* bump deps ([51019ff](https://github.com/Coobaha/typed-fastify/commit/51019ffc1d57e362f3e07cc48bf3df8d50f0b742))
* bump deps ([584c73e](https://github.com/Coobaha/typed-fastify/commit/584c73ec22311562aa025b8443043c37913506d7))
* bump deps ([#66](https://github.com/Coobaha/typed-fastify/issues/66)) ([03794d2](https://github.com/Coobaha/typed-fastify/commit/03794d2e5e8eca914194dec58bb681e07faa4a04))
* bump deps and update tests ([#78](https://github.com/Coobaha/typed-fastify/issues/78)) ([486dae2](https://github.com/Coobaha/typed-fastify/commit/486dae255fb2f17b0dc1df4dd634b6091501c016))
* bump fastify and fix types ([eab5750](https://github.com/Coobaha/typed-fastify/commit/eab5750d1f30b8e1d414742fe314ff1f800d4b70))
* bump test and fix schema with const tag ([77d5a8b](https://github.com/Coobaha/typed-fastify/commit/77d5a8b57522dc4f2feea38d15aca8529cb3a213))
* bump to fastify4 ([b1e9813](https://github.com/Coobaha/typed-fastify/commit/b1e98132abb660cc0bb7b0d0d905ef252f3b15d0))
* bumping minor version as 0.1.x were published ([bd0d44c](https://github.com/Coobaha/typed-fastify/commit/bd0d44c339265c337c626e05aa5ec01db48b9ac6))
* change Jsonlike behavior for response body to allow both JsonValue and original type ([b8716f6](https://github.com/Coobaha/typed-fastify/commit/b8716f670ceb66b623b7d740697c3991493eef9c))
* fix code after deps bump ([6440479](https://github.com/Coobaha/typed-fastify/commit/64404796f3ba28a407e120e903398dac979d8e64))
* fix schema generator in node v14 ([391d59d](https://github.com/Coobaha/typed-fastify/commit/391d59d8d9e29b079130a7a4c05040ae320d7c5a))
* fix type imports ([6bf1606](https://github.com/Coobaha/typed-fastify/commit/6bf1606e29b9c7c9248e7e0bdd419f44dd5ddb78))
* fix type missmatch ([#57](https://github.com/Coobaha/typed-fastify/issues/57)) ([72e8d9b](https://github.com/Coobaha/typed-fastify/commit/72e8d9b61cad07ff3e39ced44b8b952ce6e5260c))
* jsonify req.body ([636b343](https://github.com/Coobaha/typed-fastify/commit/636b3435428728498a3cc93191861d3471a18eae))
* make response schema be a map of statuses instead of contents ([a8fd0c7](https://github.com/Coobaha/typed-fastify/commit/a8fd0c7e94505dfc33b8e51f4b39851d6ba7b0a4))
* mention TS 4.2 requirement ([fdc39d0](https://github.com/Coobaha/typed-fastify/commit/fdc39d06e584393c941d00655cc5e485ae0dd970))
* Omit then from Reply to correctly infer AsReply return 🎉 ([a2a143c](https://github.com/Coobaha/typed-fastify/commit/a2a143c2d0d9f0ff0dab8eefee49bd1e4380e048))
* release as latest dist-tag ([9517815](https://github.com/Coobaha/typed-fastify/commit/951781514813f1d64f213614c19edcefae29cd92))
* release as latest dist-tag ([37e3541](https://github.com/Coobaha/typed-fastify/commit/37e354104e77e932b815725b5bb3166520899d24))
* rename definitions to namespace ([f887706](https://github.com/Coobaha/typed-fastify/commit/f887706fed340a5943212984b7cdb0d7352f72a6))
* rename namespace to properties ([89da88c](https://github.com/Coobaha/typed-fastify/commit/89da88c49967eaa5c53db88b848f509e31ae172d))
* tweak release action ([e1ce5de](https://github.com/Coobaha/typed-fastify/commit/e1ce5de881310bdcf5254d0e7ccb2317203b752e))
* validate schema without responses and force send to be called ([2ecda87](https://github.com/Coobaha/typed-fastify/commit/2ecda876484c21d1b23e7f0a520d4e015cad5eb9))

## [2.0.0](https://github.com/Coobaha/typed-fastify/compare/v1.2.0...v2.0.0) (2023-10-31)


### ⚠ BREAKING CHANGES

* Better support for json-like input and outputs in the schema
* additionalProperties false by default ([#88](https://github.com/Coobaha/typed-fastify/issues/88))
* jsonify req.body

### Features

* allow jsonified variants in response ([e15f273](https://github.com/Coobaha/typed-fastify/commit/e15f27313361b333cc3dad517ded4168d7e36bf0))
* Better support for json-like input and outputs in the schema ([f27e6f8](https://github.com/Coobaha/typed-fastify/commit/f27e6f8e4ebe9a71ce04f9e91c36337b306824a1))


### Bug Fixes

* additionalProperties false by default ([#88](https://github.com/Coobaha/typed-fastify/issues/88)) ([442fabb](https://github.com/Coobaha/typed-fastify/commit/442fabb9c7fd216f188c7dfb1f79f2e04f697b0c))
* change Jsonlike behavior for response body to allow both JsonValue and original type ([b8716f6](https://github.com/Coobaha/typed-fastify/commit/b8716f670ceb66b623b7d740697c3991493eef9c))
* fix type imports ([6bf1606](https://github.com/Coobaha/typed-fastify/commit/6bf1606e29b9c7c9248e7e0bdd419f44dd5ddb78))
* jsonify req.body ([636b343](https://github.com/Coobaha/typed-fastify/commit/636b3435428728498a3cc93191861d3471a18eae))

## [1.2.0](https://github.com/Coobaha/typed-fastify/compare/v1.1.4...v1.2.0) (2023-09-16)


### Features

* add request.routeOptions support ([#82](https://github.com/Coobaha/typed-fastify/issues/82)) ([1a49a6c](https://github.com/Coobaha/typed-fastify/commit/1a49a6cdf02e1afb4dff037286eecdd9b24257ad))

## [1.1.4](https://github.com/Coobaha/typed-fastify/compare/v1.1.3...v1.1.4) (2023-08-21)


### Bug Fixes

* bump test and fix schema with const tag ([77d5a8b](https://github.com/Coobaha/typed-fastify/commit/77d5a8b57522dc4f2feea38d15aca8529cb3a213))

## [1.1.3](https://github.com/Coobaha/typed-fastify/compare/v1.1.2...v1.1.3) (2023-08-21)


### Bug Fixes

* bump 📸 ([2aa0ce6](https://github.com/Coobaha/typed-fastify/commit/2aa0ce641cf6fffa1d418715abf4c100f4965698))
* bump deps and update tests ([#78](https://github.com/Coobaha/typed-fastify/issues/78)) ([486dae2](https://github.com/Coobaha/typed-fastify/commit/486dae255fb2f17b0dc1df4dd634b6091501c016))

## [1.1.2](https://github.com/Coobaha/typed-fastify/compare/v1.1.1...v1.1.2) (2023-05-19)


### Bug Fixes

* bump all deps ([4c6aca7](https://github.com/Coobaha/typed-fastify/commit/4c6aca7e0c0edcfc25b2e567005a45c0ed98d2b0))

## [1.1.1](https://github.com/Coobaha/typed-fastify/compare/v1.1.0...v1.1.1) (2022-10-22)


### Bug Fixes

* bump deps ([#66](https://github.com/Coobaha/typed-fastify/issues/66)) ([03794d2](https://github.com/Coobaha/typed-fastify/commit/03794d2e5e8eca914194dec58bb681e07faa4a04))

## [1.1.0](https://github.com/Coobaha/typed-fastify/compare/v1.0.1...v1.1.0) (2022-09-12)


### Features

* bump fastify / ts types and better type preHandler ([#61](https://github.com/Coobaha/typed-fastify/issues/61)) ([d7c8dce](https://github.com/Coobaha/typed-fastify/commit/d7c8dce5003f5b1d05819c819060b440c86a6613))

## [1.0.1](https://github.com/Coobaha/typed-fastify/compare/v1.0.0...v1.0.1) (2022-08-05)


### Bug Fixes

* fix type missmatch ([#57](https://github.com/Coobaha/typed-fastify/issues/57)) ([72e8d9b](https://github.com/Coobaha/typed-fastify/commit/72e8d9b61cad07ff3e39ced44b8b952ce6e5260c))

## [1.0.0](https://github.com/Coobaha/typed-fastify/compare/v0.8.0...v1.0.0) (2022-07-31)


### ⚠ BREAKING CHANGES

* bump fastify and fix types

### Bug Fixes

* $ref id replacement ([482cbd4](https://github.com/Coobaha/typed-fastify/commit/482cbd4c412f43df015ccb4b9bec09f0e15514eb))
* bump fastify and fix types ([eab5750](https://github.com/Coobaha/typed-fastify/commit/eab5750d1f30b8e1d414742fe314ff1f800d4b70))
* rename definitions to namespace ([f887706](https://github.com/Coobaha/typed-fastify/commit/f887706fed340a5943212984b7cdb0d7352f72a6))
* rename namespace to properties ([89da88c](https://github.com/Coobaha/typed-fastify/commit/89da88c49967eaa5c53db88b848f509e31ae172d))

## [0.8.0](https://github.com/Coobaha/typed-fastify/compare/v0.7.0...v0.8.0) (2022-07-03)


### ⚠ BREAKING CHANGES

* bump to fastify4

### Bug Fixes

* bump to fastify4 ([b1e9813](https://github.com/Coobaha/typed-fastify/commit/b1e98132abb660cc0bb7b0d0d905ef252f3b15d0))

## [0.7.0](https://github.com/Coobaha/typed-fastify/compare/v0.6.0...v0.7.0) (2022-05-22)


### Features

* bump deps and expose logger and schema compiler generics from Fastify ([80d209d](https://github.com/Coobaha/typed-fastify/commit/80d209dda1721ee4492a5eff5a05ac07fe76c7e6))

## [0.6.0](https://www.github.com/Coobaha/typed-fastify/compare/v0.5.0...v0.6.0) (2022-01-04)


### ⚠ BREAKING CHANGES

* empty response type should now be typed as never instead of void

### Features

* add typed params inferred from route path ([613ef14](https://www.github.com/Coobaha/typed-fastify/commit/613ef143f0a741be9456057c1a70877678184d2f))


### Bug Fixes

* bump deps ([51019ff](https://www.github.com/Coobaha/typed-fastify/commit/51019ffc1d57e362f3e07cc48bf3df8d50f0b742))
* fix code after deps bump ([6440479](https://www.github.com/Coobaha/typed-fastify/commit/64404796f3ba28a407e120e903398dac979d8e64))

## [0.5.0](https://www.github.com/Coobaha/typed-fastify/compare/v0.4.0...v0.5.0) (2021-07-30)


### Features

* add AsRouteObj to Service interface ([f03cb41](https://www.github.com/Coobaha/typed-fastify/commit/f03cb415042b75e43403430fd09f61ba96a821e4))

## [0.4.0](https://www.github.com/Coobaha/typed-fastify/compare/v0.3.2...v0.4.0) (2021-07-14)


### ⚠ BREAKING CHANGES

* start correctly aliasing refs

### Features

* start correctly aliasing refs ([6e3362d](https://www.github.com/Coobaha/typed-fastify/commit/6e3362db34819869f2a61aef4ebbad803f77b6f1))

### [0.3.2](https://www.github.com/Coobaha/typed-fastify/compare/v0.3.1...v0.3.2) (2021-07-14)


### Bug Fixes

* bump deps ([584c73e](https://www.github.com/Coobaha/typed-fastify/commit/584c73ec22311562aa025b8443043c37913506d7))

### [0.3.1](https://www.github.com/Coobaha/typed-fastify/compare/v0.3.0...v0.3.1) (2021-02-25)


### Bug Fixes

* fix schema generator in node v14 ([391d59d](https://www.github.com/Coobaha/typed-fastify/commit/391d59d8d9e29b079130a7a4c05040ae320d7c5a))

## [0.3.0](https://www.github.com/Coobaha/typed-fastify/compare/v0.2.1...v0.3.0) (2021-02-24)


### Features

* treat redirect as reply ([519e6ca](https://www.github.com/Coobaha/typed-fastify/commit/519e6cad45ba780c78f6c0938f75b032b6bf2da1))

### [0.2.1](https://www.github.com/Coobaha/typed-fastify/compare/v0.2.0...v0.2.1) (2021-02-24)


### Bug Fixes

* Omit then from Reply to correctly infer AsReply return 🎉 ([a2a143c](https://www.github.com/Coobaha/typed-fastify/commit/a2a143c2d0d9f0ff0dab8eefee49bd1e4380e048))

## [0.2.0](https://www.github.com/Coobaha/typed-fastify/compare/v0.1.0...v0.2.0) (2021-02-19)


### ⚠ BREAKING CHANGES

* bumping minor version as 0.1.x were published

### Bug Fixes

* bumping minor version as 0.1.x were published ([bd0d44c](https://www.github.com/Coobaha/typed-fastify/commit/bd0d44c339265c337c626e05aa5ec01db48b9ac6))

## [0.1.0](https://www.github.com/Coobaha/typed-fastify/compare/v0.0.5...v0.1.0) (2021-02-19)


### ⚠ BREAKING CHANGES

* make response schema be a map of statuses instead of contents

### Bug Fixes

* make response schema be a map of statuses instead of contents ([a8fd0c7](https://www.github.com/Coobaha/typed-fastify/commit/a8fd0c7e94505dfc33b8e51f4b39851d6ba7b0a4))

### [0.0.5](https://www.github.com/Coobaha/typed-fastify/compare/v0.0.4...v0.0.5) (2021-02-19)


### Bug Fixes

* validate schema without responses and force send to be called ([2ecda87](https://www.github.com/Coobaha/typed-fastify/commit/2ecda876484c21d1b23e7f0a520d4e015cad5eb9))

### [0.0.4](https://www.github.com/Coobaha/typed-fastify/compare/v0.0.3...v0.0.4) (2021-02-18)


### Bug Fixes

* release as latest dist-tag ([9517815](https://www.github.com/Coobaha/typed-fastify/commit/951781514813f1d64f213614c19edcefae29cd92))

### [0.0.3](https://www.github.com/Coobaha/typed-fastify/compare/v0.0.2...v0.0.3) (2021-02-18)


### Bug Fixes

* release as latest dist-tag ([37e3541](https://www.github.com/Coobaha/typed-fastify/commit/37e354104e77e932b815725b5bb3166520899d24))

### [0.0.2](https://www.github.com/Coobaha/typed-fastify/compare/v0.0.1...v0.0.2) (2021-02-18)


### Bug Fixes

* mention TS 4.2 requirement ([fdc39d0](https://www.github.com/Coobaha/typed-fastify/commit/fdc39d06e584393c941d00655cc5e485ae0dd970))
