'use strict'

/*
enables focus ring on keydown
disables focus ring on mouse/touch
*/


export default class FocusStyleToggle extends React.Component {
	constructor(props) {
		super(props)
		this.style = props.style || 'a,button,.message-content{outline: 0}'
		this.state = {isOutlineDisabled: true}
		this.onKey = this.onKey.bind(this)
		this.onMouse = this.onMouse.bind(this)
	}

	onKey(e) {
		// TODO move 9 into constants somewhere
		if (e.keyCode === 9) {
			this.setState({isOutlineDisabled: false})
		} else {
			this.setState({isOutlineDisabled: true})
		}
	}

	onMouse() {
		this.setState({isOutlineDisabled: true})
	}

	componentDidMount() {
		const {document: bd=null} = global

		if (bd) {
			bd.addEventListener('mousedown', this.onMouse, true)
			bd.addEventListener('touchstart', this.onMouse, true)
			bd.addEventListener('keydown', this.onKey, true)
		}
	}

	componentWillUnmount() {
		const {document: bd=null} = global

		if (bd) {
			bd.removeEventListener('mousedown', this.onMouse, true)
			bd.removeEventListener('touchstart', this.onMouse, true)
			bd.removeEventListener('keydown', this.onKey, true)
		}
	}

	render() {
		if (this.state.isOutlineDisabled) {
			return <style>{this.style}</style>
		}
		else {
			return null
		}
	}
}
