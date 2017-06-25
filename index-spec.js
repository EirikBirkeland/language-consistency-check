const test = require('ava')
const consistency = require('./index')
const isArray = require('lodash.isarray')

const sourceStrings = ['apple', 'pear', 'unicorn', 'apple']
const targetStrings = ['eple', 'pære', 'enhjørning', 'epple']
test('type of returned element should be object', t => {
    t.is("object", typeof consistency({indexToTest: 0, sourceStrings: sourceStrings, targetStrings: targetStrings}))
})
test('type of returned element should be Array', t => {
    t.is(true, isArray(consistency({sourceStrings: sourceStrings, targetStrings: targetStrings})))
})