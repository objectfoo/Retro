'use strict'
import {GOOD, BAD, NEXT} from '../index';

const titleDictionary = {
	GOOD: 'Good',
	BAD: 'Bad',
	NEXT: 'Next'
}

const mapIdToTitle = (id) => titleDictionary[id] || ''

export {mapIdToTitle as default}
