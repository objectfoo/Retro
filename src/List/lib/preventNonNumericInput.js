'use strict';

export const DELETE = 46
export const BACKSPACE = 8
export const TAB = 9
export const ESCAPE = 27
export const DECIMAL = 110
export const PERIOD = 190
export const a = 65
export const c = 67
export const x = 88
export const v = 86
export const HOME = 35
export const UP = 38
export const RIGHT = 39
export const DOWN = 40
export const ZERO = 48
export const NINE = 57
export const NUMPAD_ZERO = 96
export const NUMPAD_NINE = 105
const specials = [DELETE, BACKSPACE, TAB, ESCAPE, DECIMAL, PERIOD]

const prevenNonNumericInput = (e) => {
	const code = e.keyCode
	// const ctrlKey = e.ctrlKey
	const shiftKey = e.shiftKey
	const metaKey = e.metaKey || e.ctrlKey

	if (specials.indexOf(code) !== -1 ||
			(code == a && metaKey === true) ||
			(code == c && metaKey === true) ||
			(code == x && metaKey === true) ||
			(code == v && metaKey === true) ||
			(code >= HOME && code <= RIGHT) ||
			((shiftKey && (code >= ZERO && code <= NINE)) || (code >= NUMPAD_ZERO && code <= NUMPAD_NINE)) ||
			((code >= ZERO && code <= NINE) || (code >= NUMPAD_ZERO && code <= NUMPAD_NINE))
		) {
		return
	} else {
		e.preventDefault()
	}
}

export {prevenNonNumericInput as default}
