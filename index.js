// MIT © Eirik Birkeland
/**
 * Created by eb on 2017/06/25.
 */
'use strict'

/**
 * Check consistency between two input lists, to ensure that strings have been translated consistently (at the segment level).
 * @param [opts.indexToTest] {Number} - specify an index to test. If undefined, an array will be returned with a report for each index
 * @param opts.sourceStrings {string[]} - an array of source strings (original text)
 * @param opts.targetStrings {string[]} - an array of target strings (the translated text)
 * @param opts.logger {Function} - optional logger; /dev/null by default
 * @param opts.invert {Boolean} - whether to invert source/target
 * @return {{inconsistentIds, report}} - returns a report object
 */
function checkConsistency(opts) {
    const {
        indexToTest,
        sourceStrings,
        targetStrings,
        logger = function () {
        },
        invert
    } = opts

    const strings1 = invert ? targetStrings : sourceStrings
    const strings2 = invert ? sourceStrings : targetStrings

    /**
     *
     * @param indexToTest {number} - the index of strings1 to test
     * @returns {*}
     */
    function runCheck(indexToTest) {
        const dupeSegIds = []
        const inconsistentIds = []

        if (_hasDupes()) {
            _getDupes()
            if (dupeSegIds.length > 0) {

                // Check not equal
                dupeSegIds.forEach((ele) => {
                    if (strings2[indexToTest] !== strings2[ele]) {
                        logger('Pushing ID to inconsistentIds')
                        inconsistentIds.push(ele)
                    }
                })
            } else {
                logger('No dupes')
            }
        }

        function _hasDupes() {
            return strings1.some((ele, i) => {
                if (i !== indexToTest &&
                    strings1[i] === strings1[indexToTest]) {
                    return true
                }
            })
        }

        function _getDupes() {
            strings1.forEach((ele, i) => {
                if (i !== indexToTest &&
                    strings1[i] === strings1[indexToTest]) {
                    logger('Adding a dupe to accumulator')
                    dupeSegIds.push(i)
                }
            })
        }

        if (inconsistentIds.length) {
            return inconsistentIds.length ? inconsistentIds : null
        }
    }

    const results = runCheck(indexToTest)

    if (typeof indexToTest !== "undefined") {
        return {
            inconsistentIds: results.length ? results : null,
            report: _getReport(results)
        }
    } else {
        return strings1.map((ele, i) => _getReport(runCheck(i))).filter(ele => !!ele)
    }

    /**
     *
     * @param inconsistentIds {strings[]}
     * @returns {*}
     * @private
     */
    function _getReport(inconsistentIds) {
        if (inconsistentIds && inconsistentIds.length >= 1)
            return (`${invert ? 'Source' : 'Target'} string(s) ${inconsistentIds.map($_ => $_).join(', ')} ${inconsistentIds.length === 1 ? 'is' : 'are'} inconsistent with ${invert ? 'Target' : 'Source'} index, ${indexToTest}.`)
        else
            return null // "No inconsistent ids found"
    }
}

module.exports = checkConsistency