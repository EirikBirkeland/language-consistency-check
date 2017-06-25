// MIT © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2017/06/25.
 */
'use strict'

/**
 *
 * @param [opts.indexToTest] {Number} - specify an index to test. If undefined, an array will be returned with a report for each index
 * @param opts.sourceStrings {string[]} - an array of source strings (original text)
 * @param opts.targetStrings {string[]} - an array of target strings (the translated text)
 * @param opts.logger {Function} - optional logger; /dev/null by default
 * @return {{inconsistentIds, report}} - returns a report object
 */

module.exports = function (opts) {
    const {
        indexToTest,
        sourceStrings,
        targetStrings,
        logger = function () {
        }
    } = opts

    function runCheck(indexToTest) {
        const dupeSegIds = []
        const inconsistentIds = []

        if (_hasDupes()) {
            _getDupes()
            if (dupeSegIds.length > 0) {

                // Check not equal
                dupeSegIds.forEach((ele) => {
                    if (targetStrings[indexToTest] !== targetStrings[ele]) {
                        logger('Pushing ID to inconsistentIds')
                        inconsistentIds.push(ele)
                    }
                })
            } else {
                logger('No dupes')
            }
        }

        const _getReport = (() => {
            if (inconsistentIds.length === 1)
                return (`String(s) ${inconsistentIds.map($_ => $_).join(', ')} is inconsistent with indexToTest, ${indexToTest}.`)
            else if (inconsistentIds.length > 1)
                return (`String(s) ${inconsistentIds.map($_ => $_).join(', ')} are inconsistent with indexToTest, ${indexToTest}.`)
            else
                return null // "No inconsistent ids found"
        })()

        function _hasDupes() {
            return sourceStrings.some((ele, i) => {
                if (i !== indexToTest &&
                    sourceStrings[i] === sourceStrings[indexToTest]) {
                    return true
                }
            })
        }

        function _getDupes() {
            sourceStrings.forEach((ele, i) => {
                if (i !== indexToTest &&
                    sourceStrings[i] === sourceStrings[indexToTest]) {
                    logger('Adding a dupe to accumulator')
                    dupeSegIds.push(i)
                }
            })
        }

        if (inconsistentIds.length) {
            return {
                inconsistentIds: inconsistentIds.length ? inconsistentIds : null,
                report: _getReport
            }
        }
    }

    if (typeof indexToTest !== "undefined") {
        return runCheck(indexToTest)
    } else {
        return sourceStrings.map((ele, i) => runCheck(i)).filter(ele => !!ele)
    }
}