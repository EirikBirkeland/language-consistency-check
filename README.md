# lqa-consistency-check 

[![Greenkeeper badge](https://badges.greenkeeper.io/EirikBirkeland/translation-consistency-check.svg)](https://greenkeeper.io/)



## Installation

```sh
npm install lqa-consistency-check --save
```


## Usage

```js
    const checkConsistency = require('lqa-consistency-check')
    console.log(
        checkConsistency(
            {
                indexToTest: 0,
                sourceStrings: ['A', 'B', 'C', 'A'],
                targetStrings: ['I', 'II', 'III', 'IV']
            }
        )
    )
```

## API

## License

MIT © Eirik Birkeland