'use strict'

import {GOOD, BAD, NEXT, DEFAULT_VIEW} from '../Layout'

export const defaultState = {
	[GOOD]: [],
	[BAD]: [],
	[NEXT]: [],
	view: DEFAULT_VIEW,
	editing: null
}
