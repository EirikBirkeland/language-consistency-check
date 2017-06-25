const test = require('ava')
const checkConsistency = require('./index')
const isArray = require('lodash.isarray')

const sourceStrings = ['apple', 'pear', 'unicorn', 'apple']
const targetStrings = ['eple', 'pære', 'enhjørning', 'epple']

test('type of returned element should be object', t => {
    t.is("object", typeof checkConsistency({indexToTest: 0, sourceStrings: sourceStrings, targetStrings: targetStrings}))
})

test('type of returned element should be Array', t => {
    t.is(true, isArray(checkConsistency({sourceStrings: sourceStrings, targetStrings: targetStrings})))
})

const sourceStrings2 = ['apple', 'pear', 'unicorn', 'yapple']
const targetStrings2 = ['eple', 'pære', 'enhjørning', 'eple']

console.log(
    //
    checkConsistency(
        {
            indexToTest: 0,
            sourceStrings: sourceStrings2,
            targetStrings: targetStrings2,
            logger: console.log,
            invert: true
        }
    )
)