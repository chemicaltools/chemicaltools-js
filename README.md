# chemicaltools-js

[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/njzjz/chemicaltools-js/blob/master/LICENSE.MIT)
[![License](https://img.shields.io/badge/License-Anti%20996-blue.svg)](https://github.com/njzjz/chemicaltools-js/blob/master/LICENSE.996ICU)
[![Version](https://img.shields.io/npm/v/chemicaltools.svg)](https://npmjs.com/package/chemicaltools)
[![Build Status](https://travis-ci.com/njzjz/chemicaltools-js.png?branch=master)](https://travis-ci.com/njzjz/chemicaltools-js)
[![codecov](https://codecov.io/gh/njzjz/chemicaltools-js/branch/master/graph/badge.svg)](https://codecov.io/gh/njzjz/chemicaltools-js)
[![Dependency Status](https://david-dm.org/njzjz/chemicaltools-js.svg)](https://david-dm.org/njzjz/chemicaltools-js)
[![Greenkeeper badge](https://badges.greenkeeper.io/njzjz/chemicaltools-js.svg)](https://greenkeeper.io/)
[![Downloads](https://img.shields.io/npm/dm/chemicaltools.svg)](https://npmjs.com/package/chemicaltools)
[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/chemicaltools/badge?style=rounded)](https://www.jsdelivr.com/package/npm/chemicaltools)

Chemical Tools for JavaScript.

## Dependencies

* [tiny-pinyin](https://github.com/creeperyang/pinyin)

## Installion

### Install with npm

```sh
npm i chemicaltools
```

And you can use in Node.js:

```js
chemicaltools = require('../index')
```

### Use in a web page

Add script:

```html
<script src="https://cdn.jsdelivr.net/npm/chemicaltools@latest/dist/main.js"></script>
```

## Usage

```js
console.log(JSON.stringify(chemicaltools.searchElement("Hf")));
// {"number":"72","name":"铪","symbol":"Hf","mass":"178.5","iupac":"Hafnium","origin":"Hafnia, the New Latin name for Copenhagen","pinyin":"ha","url":"https://i.loli.net/2018/03/31/5abf7a90c8da6.png"}
console.log(JSON.stringify(chemicaltools.calculateMass("C6H12O6")));
// {"name":"C6H12O6","mass":180.156,"peratom":[{"name":"氢","iupac":"Hydrogen","symbol":"H","atomnumber":12,"mass":"1.008","massper":6.714181043095984},{"name":"碳","iupac":"Carbon","symbol":"C","atomnumber":6,"mass":"12.01","massper":39.99866782122161},{"name":"氧","iupac":"Oxygen","symbol":"O","atomnumber":6,"mass":"16","massper":53.28715113568241}]}
console.log(JSON.stringify(chemicaltools.calculateGas(p = 3, V = 1, n = 1)));
// {"p":3,"V":1,"n":1,"T":0.36083714216983404}
console.log(JSON.stringify(chemicaltools.calculateAcid(0.1, [2, 7], true)));
// {"c":0.1,"pH":1.5683850420032601,"ion":[{"name":"H+","c":0.027015621187203295},{"name":"H2A","c":0.07298430582855843},{"name":"HA-","c":0.027015594171541573},{"name":"A2-","c":9.999989999984995e-8}]}
console.log(JSON.stringify(chemicaltools.calculateDeviation([2.232, 2.455, 2.742, 2.535, 2.362])));
// {"input":[2.232,2.455,2.742,2.535,2.362],"average":2.4652000000000003,"average_deviation":0.13864,"relative_average_deviation":0.05623884471848126,"standard_deviation":0.05160000000000009,"relative_standard_deviation":0.3721869590305834}
console.log(JSON.stringify(chemicaltools.makeQuestion("name", "iupac")));
// {"question":"铍","options":["Beryllium","Gallium","Lanthanum","Platinum"]}
console.log(JSON.stringify(chemicaltools.correctAnswer("铷", "Rubidiutm", "name", "iupac")));
// {"correct":false,"question":"铷","correct_answer":"Rubidium","answer":"Rubidiutm"}
```
